import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '../routers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConsoleUserAccessTokenHandlerModule } from '../handler/consoleUserAccessToken/consoleUserAccessTokenHandler.module';
import { AdminValidationMiddleware } from '../middleware/adminValidation.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ConsoleUserAccessTokenHandlerModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
        children: [{ path: 'auth', module: AuthModule }],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminValidationMiddleware).forRoutes('/');
  }
}
