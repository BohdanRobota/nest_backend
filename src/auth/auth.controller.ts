import { AuthService } from './auth.service';
import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  login(@Body() userDto: CreateUserDto){
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto);
  }
}
