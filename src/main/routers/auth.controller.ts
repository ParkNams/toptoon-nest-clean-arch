import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetConsoleUserAccessTokenHandler } from '@Src/application/handler/consoleUserAccessToken/consoleUserAccessToken.handler';

import { GetConsoleUserAccessTokenDto } from 'src/domain/dto/consoleUserAccessToken.dto';
import { Adaptor } from '../adaptors/adaptor';

@Controller()
export class AuthController {
  constructor(
    private readonly adaptor: Adaptor,
    private readonly getConsoleUserAccessTokenHandler: GetConsoleUserAccessTokenHandler,
  ) {}

  @Post('get')
  getAuthInfo(
    @Body() { consoleUserId }: GetConsoleUserAccessTokenDto,
    @Res() res: Response,
  ) {
    this.adaptor.adapt(this.getConsoleUserAccessTokenHandler)(
      consoleUserId,
      res,
    );
  }
}
