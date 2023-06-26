import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/structures/data/user/user.dto';
import { CreateOwnerUseCase } from 'src/structures/domain/admin/create-owner.use-case';

@Controller('/admin')
export class AdminController {
  constructor(private readonly createOwnerUseCase: CreateOwnerUseCase) {}
  @Post('/owner')
  async createOwner(@Body() user: UserDto) {
    const result = await this.createOwnerUseCase.execute(user);
    return result;
  }
}
