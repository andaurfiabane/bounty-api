import { PartialType } from '@nestjs/mapped-types';
import { CreatePiratesModuleDto } from './create-pirates-module.dto';

export class UpdatePiratesModuleDto extends PartialType(CreatePiratesModuleDto) {}

