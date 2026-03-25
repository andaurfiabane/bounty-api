import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreatePiratesModuleDto } from './dto/create-pirates-module.dto';
import { UpdatePiratesModuleDto } from './dto/update-pirates-module.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pirate, PirateDocument } from './schemas/pirate.schema';

@Injectable()
export class PiratesModuleService {
  constructor(
    @InjectModel(Pirate.name)
    private pirateModel: Model<PirateDocument>,
  ) {}

  async create(createPiratesModuleDto: CreatePiratesModuleDto) {
    try {
      return await this.pirateModel.create(createPiratesModuleDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('El nombre ya existe');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.pirateModel.find();
  }

  async findOne(id: string) {
    const pirate = await this.pirateModel.findById(id);

    if (!pirate) {
      throw new NotFoundException('El pirata no existe');
    }

    return pirate;
  }

  async update(id: string, updatePiratesModuleDto: UpdatePiratesModuleDto) {
    const updated = await this.pirateModel.findByIdAndUpdate(
      id,
      updatePiratesModuleDto,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('El pirata no existe');
    }

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.pirateModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('El pirata no existe');
    }

    return deleted;
  }
}