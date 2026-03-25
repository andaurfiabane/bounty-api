import { Test, TestingModule } from '@nestjs/testing';
import { PiratesModuleController } from './pirates-module.controller';
import { PiratesModuleService } from './pirates-module.service';

describe('PiratesModuleController', () => {
  let controller: PiratesModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiratesModuleController],
      providers: [PiratesModuleService],
    }).compile();

    controller = module.get<PiratesModuleController>(PiratesModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
