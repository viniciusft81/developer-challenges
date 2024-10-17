import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MachineModule } from './machine/machine.module';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [AuthModule, UserModule, MachineModule, SensorsModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
