import {
  GetConsoleUserAccessTokenData,
  ConsoleUserAccessTokenRepositoryInterface,
} from '@Src/domain/interface/repositories/consoleUserAccessToken';
import { ICallback } from 'src/domain/type/common.interface';

export class GetConsoleUserAccessTokenUC {
  constructor(
    private readonly consoleUserAccessTokenRepo: ConsoleUserAccessTokenRepositoryInterface,
  ) {}

  excute(
    input: GetConsoleUserAccessTokenData['Input'],
    callback: ICallback<GetConsoleUserAccessTokenData['Output']>,
  ): any {
    this.consoleUserAccessTokenRepo.getOne(input, callback);
  }
}
