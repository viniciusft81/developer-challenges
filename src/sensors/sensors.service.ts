import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class SensorsService {
  constructor(private prisma: PrismaService) {}

  async create(createSensorDto: CreateSensorDto, userId: number, machineId: string, pointId: string) {
    const sensorId = randomUUID()
    
    const machine = await this.prisma.machine.findUnique({
      where: { idMachine: machineId },
    });
  
    if (!machine) {
      throw new NotFoundException('Machine not found');
    }

    // Regra negócio: Sensores TcAg e TcAs não podem ser usados com máquinas do tipo Bomba
    if(machine.type === 'Pump' && (createSensorDto.model === 'TcAg' || createSensorDto.model === 'TcAs')) {
      throw new Error('Sensor type not allowed for this machine');
    }

    return this.prisma.sensor.create({
      data: {
        idSensor: sensorId,
        ...createSensorDto,
        userId,
        pointId,
        machineId
      }
    })
  }

  findAll() {
    return this.prisma.sensor.findMany();
  }

  findOne(id: string) {
    return this.prisma.sensor.findUnique({where: {idSensor: id}});
  }

  update(id: string, updateSensorDto: UpdateSensorDto) {
    return this.prisma.sensor.update({where: {idSensor: id}, data: updateSensorDto});
  }

  remove(id: string) {
    return this.prisma.sensor.delete({where: {idSensor: id}});
  }
}
