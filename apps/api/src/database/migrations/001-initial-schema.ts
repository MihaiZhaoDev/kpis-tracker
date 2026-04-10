import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1713100000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE kpi_definitions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        unit VARCHAR(50) NOT NULL,
        value_type VARCHAR(50) NOT NULL CHECK (value_type IN ('percentage', 'currency', 'integer', 'decimal')),
        target_value NUMERIC NOT NULL,
        sort_order INTEGER NOT NULL DEFAULT 0,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE kpi_values (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        kpi_id UUID NOT NULL REFERENCES kpi_definitions(id) ON DELETE CASCADE,
        actual_value NUMERIC NOT NULL,
        recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        recorded_by UUID REFERENCES users(id),
        notes TEXT
      );

      CREATE INDEX idx_projects_owner ON projects(owner_id);
      CREATE INDEX idx_kpi_defs_project ON kpi_definitions(project_id);
      CREATE INDEX idx_kpi_values_kpi ON kpi_values(kpi_id, recorded_at DESC);
      CREATE INDEX idx_kpi_defs_metadata ON kpi_definitions USING GIN(metadata);

      CREATE VIEW kpi_with_status AS
      SELECT d.*, v.actual_value, v.recorded_at AS last_recorded_at,
        CASE
          WHEN v.actual_value IS NULL THEN 'behind'
          WHEN v.actual_value >= d.target_value THEN 'completed'
          WHEN v.actual_value >= d.target_value * 0.7 THEN 'on_track'
          WHEN v.actual_value >= d.target_value * 0.4 THEN 'at_risk'
          ELSE 'behind'
        END AS status
      FROM kpi_definitions d
      LEFT JOIN LATERAL (
        SELECT * FROM kpi_values WHERE kpi_id = d.id
        ORDER BY recorded_at DESC LIMIT 1
      ) v ON true;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP VIEW IF EXISTS kpi_with_status;
      DROP TABLE IF EXISTS kpi_values;
      DROP TABLE IF EXISTS kpi_definitions;
      DROP TABLE IF EXISTS projects;
      DROP TABLE IF EXISTS users;
    `);
  }
}
