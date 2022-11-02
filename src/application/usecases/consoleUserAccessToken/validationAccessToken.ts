import {
  ConsoleUserAccessTokenRepositoryInterface,
  ValidateAccessTokenData,
} from '@Src/domain/repositories/consoleUserAccessToken';
import { ICallback } from '@Src/domain/type/common.interface';

export class ValidateAccessTokenUC {
  constructor(
    private readonly consoleUserAccessTokenRepo: ConsoleUserAccessTokenRepositoryInterface,
  ) {}
  excute(
    input: ValidateAccessTokenData['Input'],
    callback: ICallback<ValidateAccessTokenData['Output']>,
  ): any {
    this.consoleUserAccessTokenRepo.validateAccessToken(input, callback);
  }
}
