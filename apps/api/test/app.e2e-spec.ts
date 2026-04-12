import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let projectId: string;
  let kpiId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const user = {
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      name: 'Test User',
    };

    it('POST /api/auth/register — should register a user', () => {
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send(user)
        .expect(201)
        .expect((res) => {
          expect(res.body.data.user.email).toBe(user.email);
          expect(res.body.data.accessToken).toBeDefined();
          accessToken = res.body.data.accessToken;
        });
    });

    it('POST /api/auth/login — should login', () => {
      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: user.email, password: user.password })
        .expect(201)
        .expect((res) => {
          expect(res.body.data.accessToken).toBeDefined();
        });
    });

    it('GET /api/auth/me — should return current user', () => {
      return request(app.getHttpServer())
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.email).toBe(user.email);
        });
    });

    it('GET /api/auth/me — should reject without token', () => {
      return request(app.getHttpServer())
        .get('/api/auth/me')
        .expect(401);
    });
  });

  describe('Projects', () => {
    it('POST /api/projects — should create a project', () => {
      return request(app.getHttpServer())
        .post('/api/projects')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Test Project', description: 'A test project' })
        .expect(201)
        .expect((res) => {
          expect(res.body.data.name).toBe('Test Project');
          projectId = res.body.data.id;
        });
    });

    it('GET /api/projects — should list projects', () => {
      return request(app.getHttpServer())
        .get('/api/projects')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.length).toBeGreaterThan(0);
          expect(res.body.meta.total).toBeGreaterThan(0);
        });
    });

    it('GET /api/projects/:id — should get project', () => {
      return request(app.getHttpServer())
        .get(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.id).toBe(projectId);
        });
    });

    it('PATCH /api/projects/:id — should update project', () => {
      return request(app.getHttpServer())
        .patch(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Updated Project' })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.name).toBe('Updated Project');
        });
    });
  });

  describe('KPIs', () => {
    it('POST /api/projects/:id/kpis — should create a KPI', () => {
      return request(app.getHttpServer())
        .post(`/api/projects/${projectId}/kpis`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Revenue',
          unit: 'USD',
          valueType: 'currency',
          targetValue: 10000,
          category: 'financial',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.data.name).toBe('Revenue');
          kpiId = res.body.data.id;
        });
    });

    it('GET /api/projects/:id/kpis — should list KPIs with status', () => {
      return request(app.getHttpServer())
        .get(`/api/projects/${projectId}/kpis`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.length).toBeGreaterThan(0);
        });
    });

    it('POST /api/projects/:id/kpis/:kpiId/values — should record a value', () => {
      return request(app.getHttpServer())
        .post(`/api/projects/${projectId}/kpis/${kpiId}/values`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ actualValue: 5000, notes: 'Mid-quarter update' })
        .expect(201)
        .expect((res) => {
          expect(Number(res.body.data.actualValue)).toBe(5000);
        });
    });

    it('GET /api/projects/:id/kpis/:kpiId/values — should list value history', () => {
      return request(app.getHttpServer())
        .get(`/api/projects/${projectId}/kpis/${kpiId}/values`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.length).toBeGreaterThan(0);
        });
    });

    it('GET /api/projects/:id/summary — should return KPI summary', () => {
      return request(app.getHttpServer())
        .get(`/api/projects/${projectId}/summary`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.totalKpis).toBeGreaterThan(0);
        });
    });
  });

  describe('Health', () => {
    it('GET /api/health — should return healthy', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('ok');
        });
    });
  });
});
