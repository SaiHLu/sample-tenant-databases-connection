import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TENANT_CONNECTION } from 'src/common/database/database.module';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly dataSource: DataSource,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return this.dataSource.getRepository(User).find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
