import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

const mysqlProviders = [
  {
    provide: 'GLOBAL',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        entities: [
          // 'src/infra/entities/**/*.entityentity{.ts,.js}',
          'dist/infra/entities/**/*.entity{.ts,.js}',
        ],
        replication: {
          master: {
            host: process.env.MYSQL_HOST,
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
          },
          slaves: [
            {
              host: process.env.MYSQL_SLAVE_HOST,
              port: 3306,
              username: process.env.MYSQL_SLAVE_USER,
              password: process.env.MYSQL_SLAVE_PASSWORD,
              database: process.env.MYSQL_SLAVE_DATABASE,
            },
          ],
        },
        logging: process.env.ENVIRONMENT === 'development',
        synchronize: true,
        extra: {
          connectionLimit: process.env.ENVIRONMENT === 'development' ? 18 : 38,
        },
      });
      return dataSource.initialize();
    },
  },
];

@Module({
  imports: [],
  providers: [...mysqlProviders],
  exports: [...mysqlProviders],
})
export class MysqlConnectionModule {}
