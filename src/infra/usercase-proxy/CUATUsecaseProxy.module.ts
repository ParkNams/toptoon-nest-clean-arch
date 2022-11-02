import { DynamicModule, Module } from '@nestjs/common';
import { GetConsoleUserAccessTokenUC } from '@Src/application/usecases/consoleUserAccessToken/getConsoleUserAccessToken';
import { ValidateAccessTokenUC } from '@Src/application/usecases/consoleUserAccessToken/validationAccessToken';
import { ConsoleUserAccessTokenRepository } from '../repositories/consoleUserAccessToken/consoleUserAccessToken.repository';
import { ConsoleUserAccessTokenRepositoryModule } from '../repositories/consoleUserAccessToken/consoleUserAccessTokenRepository.module';
import { UseCaseProxy } from './usecase.proxy';

@Module({
  imports: [ConsoleUserAccessTokenRepositoryModule],
})
export class CUATUseCaseProxyModule {
  static GET_CONSOLE_USER_ACCESS_TOKNE_PROXY = 'getConsoleUserAccessTokenProxy';
  static ACCESS_TOKEN_VALIDATE_PROXY = 'accessTokenValidateProxy';

  static register(): DynamicModule {
    return {
      module: CUATUseCaseProxyModule,
      providers: [
        {
          inject: [ConsoleUserAccessTokenRepository],
          provide: CUATUseCaseProxyModule.GET_CONSOLE_USER_ACCESS_TOKNE_PROXY,
          useFactory: (repo: ConsoleUserAccessTokenRepository) =>
            new UseCaseProxy(new GetConsoleUserAccessTokenUC(repo)),
        },
        {
          inject: [ConsoleUserAccessTokenRepository],
          provide: CUATUseCaseProxyModule.ACCESS_TOKEN_VALIDATE_PROXY,
          useFactory: (repo: ConsoleUserAccessTokenRepository) =>
            new UseCaseProxy(new ValidateAccessTokenUC(repo)),
        },
      ],
      exports: [
        CUATUseCaseProxyModule.GET_CONSOLE_USER_ACCESS_TOKNE_PROXY,
        CUATUseCaseProxyModule.ACCESS_TOKEN_VALIDATE_PROXY,
      ],
    };
  }
}
