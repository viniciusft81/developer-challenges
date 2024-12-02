import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonitoringPointDto } from './dto/create-monitoring-point.dto';
import { UpdateMonitoringPointDto } from './dto/update-monitoring-point.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class MonitoringPointService {
  constructor(private prisma: PrismaService) {}

  async create(createMonitoringPointDto: CreateMonitoringPointDto, req: any, machineId: string) {
    const pointId = randomUUID()

    const machine = await this.prisma.machine.findFirst({
      where: { 
        idMachine: machineId,
        userId: req.sub.sub
      },
    });

    if (!machine) {
      throw new NotFoundException('Machine not found');
    }

    return this.prisma.monitoringPoint.create({
      data: {
        idPoint: pointId,
        ...createMonitoringPointDto,
        userId: req.sub.sub,
        machineId
      }
    })
  }

  async findAll(req: any) {
    return await this.prisma.monitoringPoint.findMany(
      {
        where: {
          userId: req.sub.sub
        }
      }
    );
  }

  async findOne(id: string, machineId: string, req: any) {
    const point = await this.prisma.monitoringPoint.findFirst({
      where: {
        idPoint: id,
        machineId: machineId, 
        userId: req.sub.sub
      }
  });
    if(!point) {
      throw new NotFoundException('Monitoring point not found');
    }
    return point;
  }

  async update(id: string, machineId: string, updateMonitoringPointDto: UpdateMonitoringPointDto, req: any) {
    const point = await this.prisma.monitoringPoint.findFirst({
      where: {
        idPoint: id,
        machineId: machineId,
        userId: req.sub.sub
      },
    });
    if (!point) throw new NotFoundException('Monitoring point not found');
    
    return await this.prisma.monitoringPoint.update({
      where: {
        idPoint_machineId: {
          idPoint: id,
          machineId: machineId
        },
      },   
      data: updateMonitoringPointDto    
    });
  }

  async remove(id: string, machineId: string, req: any) {
    const point = await this.prisma.monitoringPoint.findFirst({
      where: {
        idPoint: id,
        machineId: machineId,
        userId: req.sub.sub
      },
    });
    if (!point) throw new NotFoundException('Monitoring point not found');

    return await this.prisma.monitoringPoint.delete({
      where: {
        idPoint_machineId: {
          idPoint: id,
          machineId: machineId
        },
      }
    });
  }
}
