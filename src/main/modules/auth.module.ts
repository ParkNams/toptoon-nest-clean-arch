import { Module } from '@nestjs/common';
import { ConsoleUserAccessTokenHandlerModule } from '@Src/main/handler/consoleUserAccessToken/consoleUserAccessTokenHandler.module';
import { Adaptor } from '../adaptors/adaptor';
import { AuthController } from '../routers/auth.controller';

@Module({
  imports: [ConsoleUserAccessTokenHandlerModule],
  controllers: [AuthController],
  providers: [Adaptor],
})
export class AuthModule {}