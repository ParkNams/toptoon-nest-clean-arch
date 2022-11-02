import { Inject, Injectable } from '@nestjs/common';
import { UseCaseProxy } from '@Src/infra/usercase-proxy/usecase.proxy';
import { CUATUseCaseProxyModule } from '@Src/infra/usercase-proxy/CUATUsecaseProxy.module';
import {
  ConsoleUserAccessTokenGetOne,
  ValidateAccessTokenData,
} from 'src/domain/repositories/consoleUserAccessToken';
import { ICallback } from 'src/domain/type/common.interface';
import { GetConsoleUserAccessTokenUC } from '@Src/application/usecases/consoleUserAccessToken/getConsoleUserAccessToken';
import { Handler } from '../handler';
import { ValidateAccessTokenUC } from '@Src/application/usecases/consoleUserAccessToken/validationAccessToken';

@Injectable()
export class GetConsoleUserAccessTokenHandler extends Handler<
  ConsoleUserAccessTokenGetOne['Output']
> {
  constructor(
    @Inject(CUATUseCaseProxyModule.GET_CONSOLE_USER_ACCESS_TOKNE_PROXY)
    private readonly proxy: UseCaseProxy<GetConsoleUserAccessTokenUC>,
  ) {
    super();
  }

  perform(
    input: any,
    callback: ICallback<ConsoleUserAccessTokenGetOne['Output']>,
  ) {
    this.proxy.getInstance().excute(input, (err, token) => {
      if (err) {
        return callback(err);
      }
      return callback(null, token);
    });
  }
}

@Injectable()
export class ValidateAccessTokenHandler extends Handler<
  ValidateAccessTokenData['Output']
> {
  constructor(
    @Inject(CUATUseCaseProxyModule.ACCESS_TOKEN_VALIDATE_PROXY)
    private readonly proxy: UseCaseProxy<ValidateAccessTokenUC>,
  ) {
    super();
  }
  perform(
    input: ValidateAccessTokenData['Input'],
    callback: ICallback<ValidateAccessTokenData['Output']>,
  ) {
    this.proxy.getInstance().excute(input, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
}
