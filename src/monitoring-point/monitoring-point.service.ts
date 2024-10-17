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

    const machine = await this.prisma.machine.findUnique({
      where: { idMachine: machineId },
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

  findAll() {
    return this.prisma.monitoringPoint.findMany();
  }

  findOne(id: string, machineId: string) {
    return this.prisma.monitoringPoint.findUnique({
      where: {
          idPoint_machineId: {
              idPoint: id,
              machineId: machineId
          }
      }
  });
  }

  update(id: string, machineId: string, updateMonitoringPointDto: UpdateMonitoringPointDto) {
    return this.prisma.monitoringPoint.update({
      where: {
        idPoint_machineId: {
          idPoint: id,
          machineId: machineId
        }
      }, 
      
      data: updateMonitoringPointDto
    
    });
  }

  remove(id: string, machineId: string) {
    return this.prisma.monitoringPoint.delete({
      where: {
        idPoint_machineId: {
          idPoint: id,
          machineId: machineId
        }
      }
    });
  }
}
