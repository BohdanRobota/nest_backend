import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService) { }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user: User = await this.userRepository.findByPk(dto.userId);
    const role: Role = await this.roleService.getRoleByValue(dto.value);

    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException('Role or User is undefined', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user: User = await this.userRepository.findByPk(dto.userId);
    if(!user){
      throw new HttpException('User is undefined', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
