import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    UserModule,
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
    PrismaService,
  ],
})
export class AppModule {}
