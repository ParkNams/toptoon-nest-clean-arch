import { ConsoleUserAccessToken } from '../entities/consoleUserAccessToken';
import { ICallback } from '../type/common.interface';

export interface ConsoleUserAccessTokenRepositoryInterface {
  getOne: (
    input: ConsoleUserAccessTokenGetOne['Input'],
    callback: ICallback<ConsoleUserAccessTokenGetOne['Output']>,
  ) => void;

  validateAccessToken: (
    input: ValidateAccessTokenData['Input'],
    callback: ICallback<ValidateAccessTokenData['Output']>,
  ) => void;
}

export interface ConsoleUserAccessTokenGetOne {
  Input: number;
  Output: ConsoleUserAccessToken;
}

export interface ValidateAccessTokenData {
  Input: string;
  Output: { validationResult: boolean; profile: object | string };
}
