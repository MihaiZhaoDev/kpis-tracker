import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';

describe('ProjectService', () => {
  let service: ProjectService;
  let repo: {
    findAndCount: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    remove: jest.Mock;
    manager: { query: jest.Mock };
  };

  const ownerId = 'owner-1';

  beforeEach(async () => {
    repo = {
      findAndCount: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn((data) => data),
      save: jest.fn((entity) => Promise.resolve({ id: 'proj-1', ...entity })),
      remove: jest.fn(),
      manager: { query: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        { provide: getRepositoryToken(Project), useValue: repo },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  describe('findAll', () => {
    it('should return paginated projects', async () => {
      const projects = [{ id: 'p1', ownerId }];
      repo.findAndCount.mockResolvedValue([projects, 1]);

      const result = await service.findAll(ownerId, 1, 20);
      expect(result.data).toEqual(projects);
      expect(result.meta.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException when project does not exist', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.findOne('bad-id', ownerId)).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException for wrong owner', async () => {
      repo.findOne.mockResolvedValue({ id: 'p1', ownerId: 'other' });
      await expect(service.findOne('p1', ownerId)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('create', () => {
    it('should create a project with the given owner', async () => {
      const result = await service.create({ name: 'Test' }, ownerId);
      expect(repo.create).toHaveBeenCalledWith({ name: 'Test', ownerId });
      expect(result.id).toBe('proj-1');
    });
  });
});
