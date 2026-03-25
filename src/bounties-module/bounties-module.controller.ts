import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BountiesModuleService } from './bounties-module.service';
import { CreateBountiesModuleDto } from './dto/create-bounties-module.dto';
import { UpdateBountiesModuleDto } from './dto/update-bounties-module.dto';

@Controller('bounties')
export class BountiesModuleController {
  constructor(private readonly bountiesModuleService: BountiesModuleService) {}

  @Post()
  create(@Body() createBountiesModuleDto: CreateBountiesModuleDto) {
    return this.bountiesModuleService.create(createBountiesModuleDto);
  }

  @Get()
  findAll() {
    return this.bountiesModuleService.findAll();
  }

  @Get('active')
  findActive() {
    return this.bountiesModuleService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bountiesModuleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBountiesModuleDto: UpdateBountiesModuleDto,
  ) {
    return this.bountiesModuleService.update(id, updateBountiesModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bountiesModuleService.remove(id);
  }
}