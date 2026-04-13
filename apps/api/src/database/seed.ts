import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { dataSourceOptions } from '../config/typeorm.config';
import { User } from '../modules/auth/entities/user.entity';
import { Project } from '../modules/project/entities/project.entity';
import { KpiDefinition } from '../modules/kpi/entities/kpi-definition.entity';
import { KpiValue } from '../modules/kpi/entities/kpi-value.entity';

async function seed() {
  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();
  console.log('Database connection established.');

  try {
    const userRepo = dataSource.getRepository(User);
    const projectRepo = dataSource.getRepository(Project);
    const kpiDefRepo = dataSource.getRepository(KpiDefinition);
    const kpiValueRepo = dataSource.getRepository(KpiValue);

    // Check if demo user already exists
    const existingUser = await userRepo.findOne({ where: { email: 'demo@wsp.com' } });
    if (existingUser) {
      console.log('Demo user already exists — skipping seed.');
      await dataSource.destroy();
      return;
    }

    // 1. Create demo user
    console.log('Creating demo user...');
    const passwordHash = await bcrypt.hash('password123', 10);
    const user = userRepo.create({
      email: 'demo@wsp.com',
      passwordHash,
      name: 'Demo User',
    });
    await userRepo.save(user);
    console.log(`  User created: ${user.email} (id: ${user.id})`);

    // 2. Create projects
    console.log('Creating projects...');
    const projectsData = [
      { name: 'Q2 Revenue Growth', description: 'Track key financial metrics for Q2 2026' },
      { name: 'Product Launch v2.0', description: 'Engineering and delivery KPIs for the v2.0 release' },
      { name: 'Customer Success', description: 'Monitor customer satisfaction and retention metrics' },
    ];

    const projects: Project[] = [];
    for (const pd of projectsData) {
      const project = projectRepo.create({
        name: pd.name,
        description: pd.description,
        ownerId: user.id,
      });
      await projectRepo.save(project);
      projects.push(project);
      console.log(`  Project created: "${project.name}" (id: ${project.id})`);
    }

    // 3. Define KPIs per project
    const dates = [
      new Date('2026-03-15'),
      new Date('2026-03-29'),
      new Date('2026-04-05'),
      new Date('2026-04-12'),
    ];

    const fiveDates = [
      new Date('2026-03-08'),
      new Date('2026-03-15'),
      new Date('2026-03-29'),
      new Date('2026-04-05'),
      new Date('2026-04-12'),
    ];

    interface KpiSeedData {
      name: string;
      valueType: string;
      unit: string;
      target: number;
      values: number[];
      dates: Date[];
    }

    const kpisByProject: Record<string, KpiSeedData[]> = {
      'Q2 Revenue Growth': [
        { name: 'Monthly Revenue', valueType: 'currency', unit: 'USD', target: 50000, values: [32000, 36500, 41000, 45200], dates },
        { name: 'Customer Acquisition', valueType: 'integer', unit: 'customers', target: 200, values: [89, 112, 145, 168], dates },
        { name: 'Conversion Rate', valueType: 'percentage', unit: '%', target: 5, values: [3.2, 3.8, 4.1, 4.5], dates },
      ],
      'Product Launch v2.0': [
        { name: 'Sprint Velocity', valueType: 'integer', unit: 'points', target: 80, values: [52, 61, 68, 75, 78], dates: fiveDates },
        { name: 'Bug Count', valueType: 'integer', unit: 'bugs', target: 10, values: [45, 32, 21, 14], dates },
        { name: 'Test Coverage', valueType: 'percentage', unit: '%', target: 90, values: [72, 78, 83, 87], dates },
      ],
      'Customer Success': [
        { name: 'NPS Score', valueType: 'integer', unit: 'score', target: 70, values: [52, 58, 63, 67], dates },
        { name: 'Churn Rate', valueType: 'percentage', unit: '%', target: 2, values: [4.5, 3.8, 3.2, 2.8], dates },
        { name: 'Support Response Time', valueType: 'decimal', unit: 'hours', target: 2, values: [5.2, 4.1, 3.3, 2.4], dates },
      ],
    };

    // 4. Create KPI definitions and values
    console.log('Creating KPI definitions and values...');
    for (const project of projects) {
      const kpiDataList = kpisByProject[project.name];
      if (!kpiDataList) continue;

      for (let sortIdx = 0; sortIdx < kpiDataList.length; sortIdx++) {
        const kpiData = kpiDataList[sortIdx];

        const kpiDef = kpiDefRepo.create({
          projectId: project.id,
          name: kpiData.name,
          description: null,
          category: null,
          unit: kpiData.unit,
          valueType: kpiData.valueType,
          targetValue: kpiData.target,
          sortOrder: sortIdx,
          metadata: {},
        });
        await kpiDefRepo.save(kpiDef);
        console.log(`  KPI created: "${kpiDef.name}" (project: "${project.name}", target: ${kpiData.target})`);

        // Create KPI values
        for (let i = 0; i < kpiData.values.length; i++) {
          const kpiValue = kpiValueRepo.create({
            kpiId: kpiDef.id,
            actualValue: kpiData.values[i],
            recordedAt: kpiData.dates[i],
            recordedBy: user.id,
            notes: null,
          });
          await kpiValueRepo.save(kpiValue);
        }
        console.log(`    -> ${kpiData.values.length} values recorded`);
      }
    }

    console.log('\nSeed completed successfully!');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
    console.log('Database connection closed.');
  }
}

seed();
