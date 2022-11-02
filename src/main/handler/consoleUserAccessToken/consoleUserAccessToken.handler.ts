import { Inject, Injectable } from '@nestjs/common';
import { UseCaseProxy } from '@Src/infra/usercase-proxy/usecase.proxy';
import { CUATUseCaseProxyModule } from '@Src/infra/usercase-proxy/CUATUsecaseProxy.module';
import {
  ConsoleUserAccessTokenGetOne,
  ValidateAccessTokenData,
} from 'src/domain/repositories/consoleUserAccessToken';
import { ICallback } from 'src/domain/type/common.interface';
import { GetConsoleUserAccessTokenUC } from '@Src/application/usecases/consoleUserAccessToken/getConsoleUserAccessToken';
import {
  HttpResponse,
  serverError,
  success,
} from '../../../application/helper/response';
import { Handler } from '../handler';
import { ValidateAccessTokenUC } from '@Src/application/usecases/consoleUserAccessToken/validationAccessToken';

@Injectable()
export class GetConsoleUserAccessTokenHandler extends Handler {
  constructor(
    @Inject(CUATUseCaseProxyModule.GET_CONSOLE_USER_ACCESS_TOKNE_PROXY)
    private readonly proxy: UseCaseProxy<GetConsoleUserAccessTokenUC>,
  ) {
    super();
  }

  perform(
    input: any,
    callback: ICallback<
      HttpResponse<ConsoleUserAccessTokenGetOne['Output'] | Error | string>
    >,
  ) {
    this.proxy.getInstance().excute(input, (err, token) => {
      if (err) {
        return callback(err, serverError(err));
      }
      return callback(null, success(token));
    });
  }
}

@Injectable()
export class ValidateAccessTokenHandler extends Handler {
  constructor(
    @Inject(CUATUseCaseProxyModule.ACCESS_TOKEN_VALIDATE_PROXY)
    private readonly proxy: UseCaseProxy<ValidateAccessTokenUC>,
  ) {
    super();
  }
  perform(
    input: ValidateAccessTokenData['Input'],
    callback: ICallback<
      | HttpResponse<ValidateAccessTokenData['Output'] | Error | string>
      | ValidateAccessTokenData['Output']
    >,
  ) {
    this.proxy.getInstance().excute(input, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
}
