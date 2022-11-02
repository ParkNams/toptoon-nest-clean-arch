import { Inject, Injectable } from '@nestjs/common';
import { MysqlProxy } from '@Src/proxy/mysql-proxy/mysql.proxy';
import { CUATUseCaseProxyModule } from '@Src/proxy/mysql-proxy/CUATUsecaseProxy.module';
import {
  GetConsoleUserAccessTokenData,
  ValidateAccessTokenData,
} from '@Src/domain/interface/repositories/consoleUserAccessToken';
import { ICallback } from 'src/domain/type/common.interface';
import { GetConsoleUserAccessTokenUC } from '@Src/application/usecases/consoleUserAccessToken/getConsoleUserAccessToken';
import { Handler } from '../handler';
import { ValidateAccessTokenUC } from '@Src/application/usecases/consoleUserAccessToken/validationAccessToken';

@Injectable()
export class GetConsoleUserAccessTokenHandler extends Handler<
  GetConsoleUserAccessTokenData['Output']
> {
  constructor(
    @Inject(CUATUseCaseProxyModule.GET_CONSOLE_USER_ACCESS_TOKNE_PROXY)
    private readonly proxy: MysqlProxy<GetConsoleUserAccessTokenUC>,
  ) {
    super();
  }

  perform(
    input: any,
    callback: ICallback<GetConsoleUserAccessTokenData['Output']>,
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
    private readonly proxy: MysqlProxy<ValidateAccessTokenUC>,
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
