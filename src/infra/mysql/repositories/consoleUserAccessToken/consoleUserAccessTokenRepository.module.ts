import { Module } from '@nestjs/common';
import { MysqlConnectionModule } from '@Src/infra/mysql/connections/mysqlConnection.module';
import { DataSource } from 'typeorm';
import { ConsoleUserAccessTokenRepository } from './consoleUserAccessToken.repository';

@Module({
  imports: [MysqlConnectionModule],
  providers: [
    ConsoleUserAccessTokenRepository,
    {
      provide: 'CONSOLE_USER_ACCESS_TOKEN_MASTER',
      useFactory: (datasource: DataSource) =>
        datasource.createQueryRunner('master').manager,
      inject: ['GLOBAL'],
    },
    {
      provide: 'CONSOLE_USER_ACCESS_TOKEN_SLAVE',
      useFactory: (datasource: DataSource) =>
        datasource.createQueryRunner('slave').manager,
      inject: ['GLOBAL'],
    },
  ],
  exports: [ConsoleUserAccessTokenRepository],
})
export class ConsoleUserAccessTokenRepositoryModule {}
