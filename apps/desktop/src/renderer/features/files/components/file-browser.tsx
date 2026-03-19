import { Button, Card, CardContent, CardHeader, CardTitle } from "@acme/ui";
import { FileIcon, FolderOpen } from "lucide-react";
import type { ReactElement } from "react";
import { useFileOperations } from "../hooks/use-file-operations";

export function FileBrowser(): ReactElement {
  const { files, openFile, isLoading } = useFileOperations();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Files</h1>
          <p className="text-muted-foreground">Browse and manage your files.</p>
        </div>
        <Button onClick={openFile} disabled={isLoading}>
          <FolderOpen className="mr-2 h-4 w-4" />
          Open file
        </Button>
      </div>

      {files.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileIcon className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No files opened</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Open a file to get started.
            </p>
            <Button className="mt-4" onClick={openFile} disabled={isLoading}>
              <FolderOpen className="mr-2 h-4 w-4" />
              Open file
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recent files</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {files.map((file) => (
                <li
                  key={file}
                  className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
                >
                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{file}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
