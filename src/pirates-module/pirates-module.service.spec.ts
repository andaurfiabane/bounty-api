import { Test, TestingModule } from '@nestjs/testing';
import { PiratesModuleService } from './pirates-module.service';

describe('PiratesModuleService', () => {
  let service: PiratesModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiratesModuleService],
    }).compile();

    service = module.get<PiratesModuleService>(PiratesModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
