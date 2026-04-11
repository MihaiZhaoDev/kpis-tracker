import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KpiDefinition } from './entities/kpi-definition.entity';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { paginate, PaginatedResponse } from '../../common/interfaces/paginated-response.interface';

@Injectable()
export class KpiService {
  constructor(
    @InjectRepository(KpiDefinition) private readonly kpiRepo: Repository<KpiDefinition>,
  ) {}

  async findAll(projectId: string, page: number, limit: number): Promise<PaginatedResponse<any>> {
    const offset = (page - 1) * limit;

    const data = await this.kpiRepo.manager.query(
      `SELECT * FROM kpi_with_status
       WHERE project_id = $1
       ORDER BY sort_order ASC, created_at DESC
       LIMIT $2 OFFSET $3`,
      [projectId, limit, offset],
    );

    const countResult = await this.kpiRepo.manager.query(
      `SELECT COUNT(*)::int AS total FROM kpi_definitions WHERE project_id = $1`,
      [projectId],
    );

    return paginate(data, countResult[0].total, page, limit);
  }

  async findOne(id: string, projectId: string) {
    const results = await this.kpiRepo.manager.query(
      `SELECT * FROM kpi_with_status WHERE id = $1 AND project_id = $2`,
      [id, projectId],
    );

    if (results.length === 0) throw new NotFoundException('KPI not found');
    return results[0];
  }

  async create(dto: CreateKpiDto, projectId: string): Promise<KpiDefinition> {
    const kpi = this.kpiRepo.create({ ...dto, projectId });
    return this.kpiRepo.save(kpi);
  }

  async update(id: string, dto: UpdateKpiDto, projectId: string): Promise<KpiDefinition> {
    const kpi = await this.kpiRepo.findOne({ where: { id, projectId } });
    if (!kpi) throw new NotFoundException('KPI not found');
    Object.assign(kpi, dto);
    return this.kpiRepo.save(kpi);
  }

  async remove(id: string, projectId: string): Promise<void> {
    const kpi = await this.kpiRepo.findOne({ where: { id, projectId } });
    if (!kpi) throw new NotFoundException('KPI not found');
    await this.kpiRepo.remove(kpi);
  }
}
