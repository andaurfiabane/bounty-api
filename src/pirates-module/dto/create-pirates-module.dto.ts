import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreatePiratesModuleDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsString({ message: 'La tripulación debe ser texto' })
  @IsNotEmpty({ message: 'La tripulación no puede estar vacía' })
  tripulacion: string;

  @IsBoolean({ message: 'El campo debe ser un valor booleano' })
  tieneFrutaDelDiablo: boolean;
}