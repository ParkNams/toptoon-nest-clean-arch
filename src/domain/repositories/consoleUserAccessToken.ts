import { ConsoleUserAccessToken } from '../entities/consoleUserAccessToken';
import { ICallback } from '../type/common.interface';

export interface ConsoleUserAccessTokenRepositoryInterface {
  getOne: (
    input: GetConsoleUserAccessTokenData['Input'],
    callback: ICallback<GetConsoleUserAccessTokenData['Output']>,
  ) => void;

  validateAccessToken: (
    input: ValidateAccessTokenData['Input'],
    callback: ICallback<ValidateAccessTokenData['Output']>,
  ) => void;
}

export interface GetConsoleUserAccessTokenData {
  Input: number;
  Output: ConsoleUserAccessToken;
}

export interface ValidateAccessTokenData {
  Input: string;
  Output: { validationResult: boolean; profile: object | string };
}
