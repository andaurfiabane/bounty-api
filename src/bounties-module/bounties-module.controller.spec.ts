import { Test, TestingModule } from '@nestjs/testing';
import { BountiesModuleController } from './bounties-module.controller';
import { BountiesModuleService } from './bounties-module.service';

describe('BountiesModuleController', () => {
  let controller: BountiesModuleController;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findActive: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BountiesModuleController],
      providers: [
        {
          provide: BountiesModuleService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<BountiesModuleController>(
      BountiesModuleController,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});