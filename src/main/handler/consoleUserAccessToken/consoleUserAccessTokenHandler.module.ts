import { Module } from '@nestjs/common';
import { CUATUseCaseProxyModule } from '@Src/infra/usercase-proxy/CUATUsecaseProxy.module';
import {
  GetConsoleUserAccessTokenHandler,
  ValidateAccessTokenHandler,
} from './consoleUserAccessToken.handler';

@Module({
  imports: [CUATUseCaseProxyModule.register()],
  providers: [GetConsoleUserAccessTokenHandler, ValidateAccessTokenHandler],
  exports: [GetConsoleUserAccessTokenHandler, ValidateAccessTokenHandler],
})
export class ConsoleUserAccessTokenHandlerModule {}
