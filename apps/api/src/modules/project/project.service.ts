import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { paginate, PaginatedResponse } from '../../common/interfaces/paginated-response.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private readonly projectRepo: Repository<Project>,
  ) {}

  async findAll(ownerId: string, page: number, limit: number): Promise<PaginatedResponse<Project>> {
    const [data, total] = await this.projectRepo.findAndCount({
      where: { ownerId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return paginate(data, total, page, limit);
  }

  async findOne(id: string, ownerId: string): Promise<Project> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== ownerId) throw new ForbiddenException();
    return project;
  }

  async create(dto: CreateProjectDto, ownerId: string): Promise<Project> {
    const project = this.projectRepo.create({ ...dto, ownerId });
    return this.projectRepo.save(project);
  }

  async update(id: string, dto: UpdateProjectDto, ownerId: string): Promise<Project> {
    const project = await this.findOne(id, ownerId);
    Object.assign(project, dto);
    return this.projectRepo.save(project);
  }

  async remove(id: string, ownerId: string): Promise<void> {
    const project = await this.findOne(id, ownerId);
    await this.projectRepo.remove(project);
  }

  async getSummary(id: string, ownerId: string) {
    await this.findOne(id, ownerId);

    const result = await this.projectRepo.manager.query(
      `SELECT
        COUNT(*)::int AS "totalKpis",
        COUNT(*) FILTER (WHERE status = 'completed')::int AS "completed",
        COUNT(*) FILTER (WHERE status = 'on_track')::int AS "onTrack",
        COUNT(*) FILTER (WHERE status = 'at_risk')::int AS "atRisk",
        COUNT(*) FILTER (WHERE status = 'behind')::int AS "behind",
        CASE
          WHEN COUNT(*) = 0 THEN 0
          ELSE ROUND(COUNT(*) FILTER (WHERE status = 'completed')::numeric / COUNT(*) * 100, 1)
        END AS "overallProgress"
      FROM kpi_with_status
      WHERE project_id = $1`,
      [id],
    );

    return { data: result[0] };
  }
}
