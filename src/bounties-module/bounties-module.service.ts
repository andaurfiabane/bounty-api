import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBountiesModuleDto } from './dto/create-bounties-module.dto';
import { UpdateBountiesModuleDto } from './dto/update-bounties-module.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bounty, BountyDocument } from './schemas/bounty.schema';
import { Pirate, PirateDocument } from '../pirates-module/schemas/pirate.schema';



@Injectable()
export class BountiesModuleService {
  constructor(
  @InjectModel(Bounty.name)
  private bountyModel: Model<BountyDocument>,

  @InjectModel(Pirate.name)
  private pirateModel: Model<PirateDocument>,
) {}

  async create(createBountiesModuleDto: CreateBountiesModuleDto) {
  const pirate = await this.pirateModel.findById(createBountiesModuleDto.pirata);

  if (!pirate) {
    throw new NotFoundException('El pirata no existe');
  }

  const bounty = await this.bountyModel.create(createBountiesModuleDto);
  return await bounty.populate('pirata');
  }

  async findAll() {
    return await this.bountyModel.find().populate('pirata');
  }

  async findOne(id: string) {
  const bounty = await this.bountyModel.findById(id).populate('pirata');

  if (!bounty) {
    throw new NotFoundException('El bounty no existe');
  }

  return bounty;
  }

  async update(id: string, updateBountiesModuleDto: UpdateBountiesModuleDto) {
  if (updateBountiesModuleDto.pirata) {
    const pirate = await this.pirateModel.findById(updateBountiesModuleDto.pirata);
    if (!pirate) {
      throw new NotFoundException('El pirata no existe');
    }
  }

  const updated = await this.bountyModel.findByIdAndUpdate(
    id,
    updateBountiesModuleDto,
    { new: true },
  ).populate('pirata');

  if (!updated) {
    throw new NotFoundException('El bounty no existe');
  }

  return updated;
}

  async remove(id: string) {
  const deleted = await this.bountyModel.findByIdAndDelete(id);

  if (!deleted) {
    throw new NotFoundException('El bounty no existe');
  }

  return deleted;
}

  async findActive() {
  return await this.bountyModel
    .find({ estado: 'Wanted' })
    .populate('pirata');
}

}