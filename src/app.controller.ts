import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get/user')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  post(): string {
    return this.appService.getHello();
  }

  @Put()
  put(): string {
    return this.appService.getHello();
  }

  @Delete()
  delete(): string {
    return this.appService.getHello();
  }
}
