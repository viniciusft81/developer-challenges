import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class SensorsService {
  constructor(private prisma: PrismaService) {}

  async create(createSensorDto: CreateSensorDto, req: any, machineId: string, pointId: string) {
    const sensorId = randomUUID()

    const machine = await this.prisma.machine.findFirst({
      where: { 
        idMachine: machineId, 
        userId: req.sub.sub
      },
    });
    if (!machine) throw new NotFoundException('Machine not found');

    const point = await this.prisma.monitoringPoint.findFirst({
      where: { 
        idPoint: pointId, 
        machineId: machineId, 
        userId: req.sub.sub
      },
    });
    if (!point) throw new NotFoundException('Monitoring point not found');

    // Regra negócio: Sensores TcAg e TcAs não podem ser usados com máquinas do tipo Bomba
    if(machine.type === 'Pump' && (createSensorDto.model === 'TcAg' || createSensorDto.model === 'TcAs')) {
      throw new BadRequestException('Sensor type not allowed for this machine');
    }

    return this.prisma.sensor.create({
      data: {
        idSensor: sensorId,
        ...createSensorDto,
        userId: req.sub.sub,
        pointId,
        machineId
      }
    })
  }

  async findAll(req: any) {
    return await this.prisma.sensor.findMany(
      {
        where: {
          userId: req.sub.sub}
      }
    );
  }

  async getSensorDetails(req: any) {
    return await this.prisma.sensor.findMany({
      where: { userId: req.sub.sub }, 
      select: {
        model: true,
        monitoringPoint: {
          select: {
            name: true, 
            machine: {
              select: {
                name: true, 
                type: true 
              }
            }
          },
        },
      },
    })
  }

  async findOne(id: string, req: any) {
    return await this.prisma.sensor.findFirst({where: {idSensor: id, userId: req.sub.sub}});
  }

  async update(id: string, updateSensorDto: UpdateSensorDto, req: any) {
    return this.prisma.sensor.update({where: {idSensor: id, userId: req.sub.sub }, data: updateSensorDto});
  }

  async remove(id: string, req: any) {
    const sensor = await this.prisma.sensor.findFirst({
      where: { 
        idSensor: id,
        userId: req.sub.sub,
      },
    });
  
    if (!sensor) {
      throw new NotFoundException('Sensor not found or does not belong to the user');
    }

    return await this.prisma.sensor.delete({where: {idSensor: id }});
  }
}
