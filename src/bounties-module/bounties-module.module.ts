import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BountiesModuleService } from './bounties-module.service';
import { BountiesModuleController } from './bounties-module.controller';

import { Bounty, BountySchema } from './schemas/bounty.schema';
import { Pirate, PirateSchema } from '../pirates-module/schemas/pirate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bounty.name, schema: BountySchema },
      { name: Pirate.name, schema: PirateSchema },
    ]),
  ],
  controllers: [BountiesModuleController],
  providers: [BountiesModuleService],
})
export class BountiesModuleModule {}