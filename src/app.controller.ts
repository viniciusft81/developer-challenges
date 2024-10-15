import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  constructor(
    private prisma: PrismaService,
  ) {}

  @Get('hello')
  async getHello() {
    const machine = await this.prisma.machine.create({
      data: {
        idMachine: "maq1",
        name: 'My Machine',
        type: 'Fan',
      }
    })
    return {
      machine,
    };
  }
}
