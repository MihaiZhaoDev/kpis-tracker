import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KpiValue } from './entities/kpi-value.entity';
import { KpiDefinition } from './entities/kpi-definition.entity';
import { CreateKpiValueDto } from './dto/create-kpi-value.dto';
import { paginate, PaginatedResponse } from '../../common/interfaces/paginated-response.interface';

@Injectable()
export class KpiValueService {
  constructor(
    @InjectRepository(KpiValue) private readonly valueRepo: Repository<KpiValue>,
    @InjectRepository(KpiDefinition) private readonly kpiRepo: Repository<KpiDefinition>,
  ) {}

  async findAll(kpiId: string, page: number, limit: number): Promise<PaginatedResponse<KpiValue>> {
    const [data, total] = await this.valueRepo.findAndCount({
      where: { kpiId },
      order: { recordedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return paginate(data, total, page, limit);
  }

  async create(dto: CreateKpiValueDto, kpiId: string, userId: string): Promise<KpiValue> {
    const kpi = await this.kpiRepo.findOne({ where: { id: kpiId } });
    if (!kpi) throw new NotFoundException('KPI not found');

    const value = this.valueRepo.create({
      kpiId,
      actualValue: dto.actualValue,
      notes: dto.notes,
      recordedBy: userId,
    });

    return this.valueRepo.save(value);
  }
}
