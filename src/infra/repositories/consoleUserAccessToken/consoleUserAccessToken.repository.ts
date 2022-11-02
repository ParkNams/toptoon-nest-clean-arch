import { Inject } from '@nestjs/common';
import {
  ConsoleUserAccessTokenGetOne,
  ConsoleUserAccessTokenRepositoryInterface,
  ValidateAccessTokenData,
} from 'src/domain/repositories/consoleUserAccessToken';
import { ICallback } from 'src/domain/type/common.interface';
import { ConsoleUserAccessTokenEntity } from 'src/infra/entities/consoleUserAccessToken.entity';
import { EntityManager, Raw } from 'typeorm';

export class ConsoleUserAccessTokenRepository
  implements ConsoleUserAccessTokenRepositoryInterface
{
  constructor(
    @Inject('CONSOLE_USER_ACCESS_TOKEN_SLAVE')
    private readonly slave: EntityManager,
  ) {}
  getOne(
    consoleUserId: ConsoleUserAccessTokenGetOne['Input'],
    callback: ICallback<ConsoleUserAccessTokenGetOne['Output']>,
  ) {
    this.slave
      .findOne(ConsoleUserAccessTokenEntity, {
        where: { consoleUserId },
      })
      .then(value => callback(null, value))
      .catch(err => callback(err));
  }

  validateAccessToken(
    accessToken: ValidateAccessTokenData['Input'],
    callback: ICallback<ValidateAccessTokenData['Output']>,
  ) {
    this.slave
      .findOne(ConsoleUserAccessTokenEntity, {
        where: {
          accessToken,
          expiryAt: Raw(alias => `${alias} >= NOW()`),
        },
        order: {
          expiryAt: 'DESC',
        },
      })
      .then(value => {
        if (!value) {
          return callback(new Error(`accessToken is not valid`));
        }
        const { requestResult } = value;
        try {
          callback(null, {
            validationResult: true,
            profile: JSON.parse(requestResult),
          });
        } catch (e) {
          callback(null, {
            validationResult: true,
            profile: requestResult,
          });
        }
      })
      .catch(err => callback(err));
  }
}
