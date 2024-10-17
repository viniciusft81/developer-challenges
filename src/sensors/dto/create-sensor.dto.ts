import { SensorModel } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateSensorDto {
  @IsNotEmpty({
    message: 'The sensor model is required'
  })
  @IsEnum(SensorModel, {message: 'Invalid sensor model'})
  model: SensorModel;
}
