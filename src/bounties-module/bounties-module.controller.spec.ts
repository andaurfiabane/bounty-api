import { Test, TestingModule } from '@nestjs/testing';
import { BountiesModuleController } from './bounties-module.controller';
import { BountiesModuleService } from './bounties-module.service';

describe('BountiesModuleController', () => {
  let controller: BountiesModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BountiesModuleController],
      providers: [BountiesModuleService],
    }).compile();

    controller = module.get<BountiesModuleController>(BountiesModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
