import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { MonitoringPointService } from './monitoring-point.service';
import { CreateMonitoringPointDto } from './dto/create-monitoring-point.dto';
import { UpdateMonitoringPointDto } from './dto/update-monitoring-point.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('monitoring-point')
export class MonitoringPointController {
  constructor(private readonly monitoringPointService: MonitoringPointService) {}

  @Post(':machineId')
  @UseGuards(AuthGuard)
  create(
    @Request() req: any, 
    @Param('machineId') machineId: string,
    @Body() createMonitoringPointDto: CreateMonitoringPointDto
  ) {
    return this.monitoringPointService.create(createMonitoringPointDto, req, machineId);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.monitoringPointService.findAll();
  }

  @Get(':id/:machineId')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Param('machineId') machineId: string) {
    return this.monitoringPointService.findOne(id, machineId);
  }

  @Patch(':id/:machineId')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Param('machineId') machineId: string, @Body() updateMonitoringPointDto: UpdateMonitoringPointDto) {
    return this.monitoringPointService.update(id, machineId, updateMonitoringPointDto);
  }

  @Delete(':id/:machineId')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Param('machineId') machineId: string) {
    return this.monitoringPointService.remove(id, machineId);
  }
}
