import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'node:crypto'

@Injectable()
export class MachineService {
  constructor(private prisma: PrismaService) {}

  async create(createMachineDto: CreateMachineDto, req: any) {
    const { name, type } = createMachineDto;
    const machine = await this.prisma.machine.create({
      data: {
        idMachine: randomUUID(),
        name,
        type,
        userId: req.sub.sub
      }
    })
    return {
      machine,
    };
  }

  async findAll(req: any) {
    return await this.prisma.machine.findMany({
      where: { userId: req.sub.sub }
    });
  }

  async findOne(id: string, req: any) {
    const machine = await this.prisma.machine.findFirst({
      where: { 
        idMachine: id, 
        userId: req.sub.sub 
      },
    });
    if (!machine) throw new NotFoundException('Machine not found');

    return machine;
  }

  async update(id: string, updateMachineDto: UpdateMachineDto, req: any) {
    const machine = await this.prisma.machine.findFirst({
      where: { 
        idMachine: id, 
        userId: req.sub.sub 
      },
    });
    if (!machine) throw new NotFoundException('Machine not found');

    return await this.prisma.machine.update({
      where: { 
        idMachine: id
      },
      data: updateMachineDto,
    })
  }

  async remove(id: string, req: any) {
    const machine = await this.prisma.machine.findFirst({
      where: { 
        idMachine: id, 
        userId: req.sub.sub 
      },
    });
    if (!machine) throw new NotFoundException('Machine not found');

    return await this.prisma.$transaction(async (prisma) => {
      await prisma.sensor.deleteMany({
        where: {
          monitoringPoint: {
            machineId: id,
            userId: req.sub.sub,
          },
        },
      });

      await prisma.monitoringPoint.deleteMany({
        where: {
          machineId: id,
          userId: req.sub.sub,
        },
      });
  
      return await prisma.machine.delete({
        where: {
          idMachine: id,
          userId: req.sub.sub,
        },
      });
    });
  }
}
