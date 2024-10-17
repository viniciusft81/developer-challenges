import { IsNotEmpty } from "class-validator";

export class CreateMonitoringPointDto {
  @IsNotEmpty({message: 'The name of the point is required'})
  name: string;
}
