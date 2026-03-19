export interface UserInterface {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SessionInterface {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: UserInterface;
}
