import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this._prisma.user.create({
      data: createUserDto,
    });
  }

  async getUserByUsername(username: string) {
    const user = await this._prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async getAllUser() {
    const allUser = await this._prisma.user.findMany({});
    return allUser;
  }

  findAll() {
    return this._prisma.user.findMany();
  }

  findOne(id: number) {
    return this._prisma.user.findUnique({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this._prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this._prisma.user.delete({
      where: { id },
    });
  }
}
