import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { KpiValueService } from './kpi-value.service';
import { CreateKpiValueDto } from './dto/create-kpi-value.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/kpis/:kpiId/values')
export class KpiValueController {
  constructor(private readonly kpiValueService: KpiValueService) {}

  @Get()
  findAll(
    @Param('kpiId', ParseUUIDPipe) kpiId: string,
    @Query() query: PaginationQueryDto,
  ) {
    return this.kpiValueService.findAll(kpiId, query.page, query.limit);
  }

  @Post()
  create(
    @Param('kpiId', ParseUUIDPipe) kpiId: string,
    @CurrentUser() user: User,
    @Body() dto: CreateKpiValueDto,
  ) {
    return this.kpiValueService.create(dto, kpiId, user.id).then((data) => ({ data }));
  }
}
