import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
