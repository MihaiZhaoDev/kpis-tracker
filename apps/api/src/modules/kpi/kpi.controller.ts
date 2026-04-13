import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { KpiService } from './kpi.service';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('KPIs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/kpis')
export class KpiController {
  constructor(private readonly kpiService: KpiService) {}

  @Get()
  findAll(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query() query: PaginationQueryDto,
  ) {
    return this.kpiService.findAll(projectId, query.page, query.limit);
  }

  @Post()
  create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() dto: CreateKpiDto,
  ) {
    return this.kpiService.create(dto, projectId).then((data) => ({ data }));
  }

  @Get(':id')
  findOne(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.kpiService.findOne(id, projectId).then((data) => ({ data }));
  }

  @Patch(':id')
  update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateKpiDto,
  ) {
    return this.kpiService.update(id, dto, projectId).then((data) => ({ data }));
  }

  @Delete(':id')
  remove(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.kpiService.remove(id, projectId);
  }
}
