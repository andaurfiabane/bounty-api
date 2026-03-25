import { Module } from '@nestjs/common';
import { PiratesModuleService } from './pirates-module.service';
import { PiratesModuleController } from './pirates-module.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pirate, PirateSchema } from './schemas/pirate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pirate.name, schema: PirateSchema }]),
  ],
  controllers: [PiratesModuleController],
  providers: [PiratesModuleService],
})
export class PiratesModuleModule {}
