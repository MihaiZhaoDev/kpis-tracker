import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { KpiDefinition } from './entities/kpi-definition.entity';

describe('KpiService', () => {
  let service: KpiService;
  let repo: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    remove: jest.Mock;
    manager: { query: jest.Mock };
  };

  const projectId = 'proj-1';

  beforeEach(async () => {
    repo = {
      findOne: jest.fn(),
      create: jest.fn((data) => data),
      save: jest.fn((entity) => Promise.resolve({ id: 'kpi-1', ...entity })),
      remove: jest.fn(),
      manager: { query: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KpiService,
        { provide: getRepositoryToken(KpiDefinition), useValue: repo },
      ],
    }).compile();

    service = module.get<KpiService>(KpiService);
  });

  describe('findOne', () => {
    it('should throw NotFoundException when KPI does not exist', async () => {
      repo.manager.query.mockResolvedValue([]);
      await expect(service.findOne('bad-id', projectId)).rejects.toThrow(NotFoundException);
    });

    it('should return KPI with computed status', async () => {
      const kpi = { id: 'kpi-1', name: 'Revenue', status: 'on_track' };
      repo.manager.query.mockResolvedValue([kpi]);
      const result = await service.findOne('kpi-1', projectId);
      expect(result.status).toBe('on_track');
    });
  });

  describe('create', () => {
    it('should create a KPI definition', async () => {
      const dto = {
        name: 'Revenue',
        unit: 'USD',
        valueType: 'currency',
        targetValue: 10000,
      };
      const result = await service.create(dto, projectId);
      expect(repo.create).toHaveBeenCalledWith({ ...dto, projectId });
      expect(result.id).toBe('kpi-1');
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException when KPI does not exist', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.remove('bad-id', projectId)).rejects.toThrow(NotFoundException);
    });
  });
});
