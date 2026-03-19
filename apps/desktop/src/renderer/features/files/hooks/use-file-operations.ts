import { useElectron } from "@/hooks/use-electron";
import { useCallback, useState } from "react";

interface UseFileOperationsReturn {
  files: string[];
  isLoading: boolean;
  openFile: () => Promise<void>;
  saveFile: (content: string) => Promise<void>;
}

export function useFileOperations(): UseFileOperationsReturn {
  const electron = useElectron();
  const [files, setFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const openFile = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await electron.files.openDialog({
        properties: ["openFile", "multiSelections"],
      });
      if (result && result.length > 0) {
        setFiles((prev) => {
          const combined = [...prev, ...result];
          return [...new Set(combined)];
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [electron]);

  const saveFile = useCallback(
    async (content: string) => {
      setIsLoading(true);
      try {
        const path = await electron.files.saveDialog({
          filters: [{ name: "All Files", extensions: ["*"] }],
        });
        if (path) {
          await electron.files.writeFile(path, content);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [electron],
  );

  return { files, isLoading, openFile, saveFile };
}
