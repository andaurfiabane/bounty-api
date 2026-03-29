import { Test, TestingModule } from '@nestjs/testing';
import { PiratesModuleService } from './pirates-module.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('PiratesModuleService', () => {
  let service: PiratesModuleService;

  const mockPirateModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PiratesModuleService,
        {
          provide: getModelToken('Pirate'),
          useValue: mockPirateModel,
        },
      ],
    }).compile();

    service = module.get<PiratesModuleService>(PiratesModuleService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of pirates', async () => {
    const pirates = [
      {
        nombre: 'Luffy',
        tripulacion: 'Straw Hat',
        tieneFrutaDelDiablo: true,
      },
    ];

    mockPirateModel.find.mockResolvedValue(pirates);

    const result = await service.findAll();

    expect(result).toEqual(pirates);
    expect(mockPirateModel.find).toHaveBeenCalled();
  });

  it('should throw NotFoundException if pirate does not exist', async () => {
    mockPirateModel.findById.mockResolvedValue(null);

    await expect(service.findOne('123')).rejects.toThrow(
      NotFoundException,
    );

    expect(mockPirateModel.findById).toHaveBeenCalledWith('123');
  });

  it('should return a pirate by id', async () => {
    const pirate = {
      _id: 'pirate-id',
      nombre: 'Zoro',
      tripulacion: 'Straw Hat',
      tieneFrutaDelDiablo: false,
    };

    mockPirateModel.findById.mockResolvedValue(pirate);

    const result = await service.findOne('pirate-id');

    expect(result).toEqual(pirate);
  });

  it('should create a pirate', async () => {
    const pirate = {
      nombre: 'Sanji',
      tripulacion: 'Straw Hat',
      tieneFrutaDelDiablo: false,
    };

    mockPirateModel.create.mockResolvedValue(pirate);

    const result = await service.create(pirate as any);

    expect(result).toEqual(pirate);
    expect(mockPirateModel.create).toHaveBeenCalled();
  });

  it('should throw ConflictException if name already exists', async () => {
    mockPirateModel.create.mockRejectedValue({ code: 11000 });

    await expect(
      service.create({
        nombre: 'Luffy',
        tripulacion: 'Straw Hat',
        tieneFrutaDelDiablo: true,
      } as any),
    ).rejects.toThrow(ConflictException);
  });

  it('should update a pirate', async () => {
    const updatedPirate = {
      nombre: 'Nami',
      tripulacion: 'Straw Hat',
      tieneFrutaDelDiablo: false,
    };

    mockPirateModel.findByIdAndUpdate.mockResolvedValue(updatedPirate);

    const result = await service.update('pirate-id', updatedPirate as any);

    expect(result).toEqual(updatedPirate);
    expect(mockPirateModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'pirate-id',
      updatedPirate,
      { new: true },
    );
  });

  it('should throw NotFoundException if pirate does not exist on update', async () => {
    mockPirateModel.findByIdAndUpdate.mockResolvedValue(null);

    await expect(
      service.update('pirate-id', {} as any),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a pirate', async () => {
    const deletedPirate = { _id: 'pirate-id' };

    mockPirateModel.findByIdAndDelete.mockResolvedValue(deletedPirate);

    const result = await service.remove('pirate-id');

    expect(result).toEqual(deletedPirate);
    expect(mockPirateModel.findByIdAndDelete).toHaveBeenCalledWith('pirate-id');
  });

  it('should throw NotFoundException if pirate does not exist on delete', async () => {
    mockPirateModel.findByIdAndDelete.mockResolvedValue(null);

    await expect(service.remove('pirate-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});