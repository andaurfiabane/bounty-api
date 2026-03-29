import { Test, TestingModule } from '@nestjs/testing';
import { PiratesModuleController } from './pirates-module.controller';
import { PiratesModuleService } from './pirates-module.service';

describe('PiratesModuleController', () => {
  let controller: PiratesModuleController;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiratesModuleController],
      providers: [
        {
          provide: PiratesModuleService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PiratesModuleController>(
      PiratesModuleController,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});