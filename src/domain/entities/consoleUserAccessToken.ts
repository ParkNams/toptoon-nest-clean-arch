export interface ConsoleUserAccessToken {
  id: number;
  consoleUserId: number;
  accessToken?: string;
  requestResult?: string;
  expiryAt: string;
  createdAt: string;
}
