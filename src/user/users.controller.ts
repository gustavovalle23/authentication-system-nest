import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Res() response: Response): string {
    response.status(200).send();
    return 'This action returns all users';
  }
}
