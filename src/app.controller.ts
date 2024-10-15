import { Body, Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { randomUUID } from 'node:crypto'
import { CreateMachineBody } from './dtos/create-machine-body';

@Controller()
export class AppController {
  constructor(
    private prisma: PrismaService,
  ) {}

  @Get('hello')
  async getHello(@Body() body: CreateMachineBody) {
    const { name, type } = body

    const machine = await this.prisma.machine.create({
      data: {
        idMachine: randomUUID(),
        name,
        type,
      }
    })
    return {
      machine,
    };
  }
}
