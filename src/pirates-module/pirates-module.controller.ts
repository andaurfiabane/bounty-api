import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PiratesModuleService } from './pirates-module.service';
import { CreatePiratesModuleDto } from './dto/create-pirates-module.dto';
import { UpdatePiratesModuleDto } from './dto/update-pirates-module.dto';

@Controller('pirates')
export class PiratesModuleController {
  constructor(private readonly piratesModuleService: PiratesModuleService) {}

  @Post()
  create(@Body() createPiratesModuleDto: CreatePiratesModuleDto) {
    return this.piratesModuleService.create(createPiratesModuleDto);
  }

  @Get()
  findAll() {
    return this.piratesModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piratesModuleService.findOne(id); 
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePiratesModuleDto: UpdatePiratesModuleDto,
  ) {
    return this.piratesModuleService.update(id, updatePiratesModuleDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piratesModuleService.remove(id); 
  }
}