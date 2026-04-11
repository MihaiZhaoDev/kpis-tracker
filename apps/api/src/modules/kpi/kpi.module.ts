import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KpiController } from './kpi.controller';
import { KpiValueController } from './kpi-value.controller';
import { KpiService } from './kpi.service';
import { KpiValueService } from './kpi-value.service';
import { KpiDefinition } from './entities/kpi-definition.entity';
import { KpiValue } from './entities/kpi-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KpiDefinition, KpiValue])],
  controllers: [KpiController, KpiValueController],
  providers: [KpiService, KpiValueService],
})
export class KpiModule {}
