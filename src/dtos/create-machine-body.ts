import { IsNotEmpty } from "class-validator";

export class CreateMachineBody {
  @IsNotEmpty({
    message: 'The machine name is required'
  })
  name: string;

  @IsNotEmpty()
  type: string;
}