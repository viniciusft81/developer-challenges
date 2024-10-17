import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post(':machineId, :pointId')
  @UseGuards(AuthGuard)
  create(
    @Body() createSensorDto: CreateSensorDto, 
    @Request() req: any, 
    @Param('machineId') machineId: string,
    @Param('pointId') pointId: string
  ) {
    return this.sensorsService.create(createSensorDto, req.sub, machineId, pointId);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(id);
  }
}
