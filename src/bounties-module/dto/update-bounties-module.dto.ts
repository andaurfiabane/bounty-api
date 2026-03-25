import { PartialType } from '@nestjs/mapped-types';
import { CreateBountiesModuleDto } from './create-bounties-module.dto';

export class UpdateBountiesModuleDto extends PartialType(CreateBountiesModuleDto) {}
