export {};

declare global {
  namespace Express {
    interface Request {
      uuid: string;
      consoleProfile?: any;
      languages?: Array<Language>;
      user_languages?: Array<Language>;
    }
  }
}
