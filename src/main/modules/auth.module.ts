import { Module } from '@nestjs/common';
import { ConsoleUserAccessTokenHandlerModule } from '@Src/application/handler/consoleUserAccessToken/consoleUserAccessTokenHandler.module';
import { HttpAdaptor } from '../adaptors/adaptor';
import { AuthController } from '../routers/auth.controller';

@Module({
  imports: [ConsoleUserAccessTokenHandlerModule],
  controllers: [AuthController],
  providers: [HttpAdaptor],
})
export class AuthModule {}
