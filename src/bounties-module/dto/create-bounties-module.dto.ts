import { IsNumber, IsPositive, Min, IsEnum, IsNotEmpty, IsMongoId } from 'class-validator';

export enum EstadoBounty {
  WANTED = 'Wanted',
  CAPTURED = 'Captured',
}

export class CreateBountiesModuleDto {
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @IsPositive({ message: 'La cantidad debe ser positiva' })
  @Min(0, { message: 'La cantidad no puede ser negativa' })
  cantidadBellys: number;

  @IsEnum(EstadoBounty, { message: 'El estado debe ser Wanted o Captured' })
  estado: EstadoBounty;

  @IsMongoId({ message: 'El id del pirata no es válido' })
  @IsNotEmpty({ message: 'El pirata es obligatorio' })
  pirata: string;
}
