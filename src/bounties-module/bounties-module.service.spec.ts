import { Test, TestingModule } from '@nestjs/testing';
import { BountiesModuleService } from './bounties-module.service';

describe('BountiesModuleService', () => {
  let service: BountiesModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BountiesModuleService],
    }).compile();

    service = module.get<BountiesModuleService>(BountiesModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
