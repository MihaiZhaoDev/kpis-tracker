import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { KpiDefinition } from './kpi-definition.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('kpi_values')
export class KpiValue {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'kpi_id' })
  kpiId!: string;

  @Column({ type: 'numeric', name: 'actual_value' })
  actualValue!: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'recorded_at' })
  recordedAt!: Date;

  @Column({ type: 'uuid', name: 'recorded_by', nullable: true })
  recordedBy!: string | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @ManyToOne(() => KpiDefinition, (kpi) => kpi.values, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'kpi_id' })
  kpiDefinition!: KpiDefinition;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'recorded_by' })
  recorder!: User;
}
