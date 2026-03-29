import { Test, TestingModule } from '@nestjs/testing';
import { BountiesModuleService } from './bounties-module.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

describe('BountiesModuleService', () => {
  let service: BountiesModuleService;

  const mockBountyModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn(),
  };

  const mockPirateModel = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BountiesModuleService,
        {
          provide: getModelToken('Bounty'),
          useValue: mockBountyModel,
        },
        {
          provide: getModelToken('Pirate'),
          useValue: mockPirateModel,
        },
      ],
    }).compile();

    service = module.get<BountiesModuleService>(BountiesModuleService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of bounties', async () => {
    const mockBounties = [
      {
        cantidadBellys: 1000,
        estado: 'Wanted',
        pirata: {
          nombre: 'Luffy',
          tripulacion: 'Straw Hat',
          tieneFrutaDelDiablo: true,
        },
      },
    ];

    mockBountyModel.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockBounties),
    });

    const result = await service.findAll();

    expect(result).toEqual(mockBounties);
    expect(mockBountyModel.find).toHaveBeenCalled();
  });

  it('should throw NotFoundException if bounty does not exist', async () => {
    mockBountyModel.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });

    await expect(service.findOne('123')).rejects.toThrow(
      NotFoundException,
    );

    expect(mockBountyModel.findById).toHaveBeenCalledWith('123');
  });

  it('should throw NotFoundException if pirate does not exist on create', async () => {
    mockPirateModel.findById.mockResolvedValue(null);

    await expect(
      service.create({
        cantidadBellys: 1000,
        pirata: 'pirate-id',
      } as any),
    ).rejects.toThrow(NotFoundException);
  });

  it('should create a bounty', async () => {
    const mockPirate = { _id: 'pirate-id' };

    const mockBounty = {
      populate: jest.fn().mockResolvedValue({
        cantidadBellys: 1000,
        estado: 'Wanted',
        pirata: mockPirate,
      }),
    };

    mockPirateModel.findById.mockResolvedValue(mockPirate);
    mockBountyModel.create.mockResolvedValue(mockBounty);

    const result = await service.create({
      cantidadBellys: 1000,
      pirata: 'pirate-id',
    } as any);

    expect(result).toBeDefined();
    expect(mockBountyModel.create).toHaveBeenCalled();
  });

  it('should update a bounty', async () => {
    const mockPirate = { _id: 'pirate-id' };

    const updatedBounty = {
      cantidadBellys: 2000,
      estado: 'Wanted',
      pirata: mockPirate,
    };

    mockPirateModel.findById.mockResolvedValue(mockPirate);

    mockBountyModel.findByIdAndUpdate.mockReturnValue({
      populate: jest.fn().mockResolvedValue(updatedBounty),
    });

    const result = await service.update('bounty-id', {
      cantidadBellys: 2000,
      pirata: 'pirate-id',
    } as any);

    expect(result).toEqual(updatedBounty);
    expect(mockBountyModel.findByIdAndUpdate).toHaveBeenCalled();
  });

  it('should throw NotFoundException if pirate does not exist on update', async () => {
    mockPirateModel.findById.mockResolvedValue(null);

    await expect(
      service.update('bounty-id', {
        pirata: 'invalid-pirate',
      } as any),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if bounty does not exist on update', async () => {
    const mockPirate = { _id: 'pirate-id' };

    mockPirateModel.findById.mockResolvedValue(mockPirate);

    mockBountyModel.findByIdAndUpdate.mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });

    await expect(
      service.update('bounty-id', {
        cantidadBellys: 2000,
      } as any),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a bounty', async () => {
    const deletedBounty = {
      _id: 'bounty-id',
    };

    mockBountyModel.findByIdAndDelete.mockResolvedValue(deletedBounty);

    const result = await service.remove('bounty-id');

    expect(result).toEqual(deletedBounty);
    expect(mockBountyModel.findByIdAndDelete).toHaveBeenCalledWith('bounty-id');
  });

  it('should throw NotFoundException if bounty does not exist on delete', async () => {
    mockBountyModel.findByIdAndDelete.mockResolvedValue(null);

    await expect(service.remove('bounty-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return active bounties', async () => {
    const activeBounties = [
      {
        cantidadBellys: 3000,
        estado: 'Wanted',
        pirata: {
          nombre: 'Zoro',
          tripulacion: 'Straw Hat',
          tieneFrutaDelDiablo: false,
        },
      },
    ];

    mockBountyModel.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(activeBounties),
    });

    const result = await service.findActive();

    expect(result).toEqual(activeBounties);
    expect(mockBountyModel.find).toHaveBeenCalledWith({ estado: 'Wanted' });
  });
});