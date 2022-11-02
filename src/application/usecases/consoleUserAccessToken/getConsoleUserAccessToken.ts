import {
  ConsoleUserAccessTokenGetOne,
  ConsoleUserAccessTokenRepositoryInterface,
} from 'src/domain/repositories/consoleUserAccessToken';
import { ICallback } from 'src/domain/type/common.interface';

export class GetConsoleUserAccessTokenUC {
  constructor(
    private readonly consoleUserAccessTokenRepo: ConsoleUserAccessTokenRepositoryInterface,
  ) {}

  excute(
    input: ConsoleUserAccessTokenGetOne['Input'],
    callback: ICallback<ConsoleUserAccessTokenGetOne['Output']>,
  ): any {
    this.consoleUserAccessTokenRepo.getOne(input, callback);
  }
}
