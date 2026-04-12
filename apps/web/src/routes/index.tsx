import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AppLayout } from '../components/AppLayout';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { ProjectListPage } from '../features/projects/pages/ProjectListPage';
import { CreateProjectPage } from '../features/projects/pages/CreateProjectPage';
import { ProjectDetailPage } from '../features/projects/pages/ProjectDetailPage';
import { CreateKpiPage } from '../features/kpis/pages/CreateKpiPage';
import { KpiDetailPage } from '../features/kpis/pages/KpiDetailPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'projects', element: <ProjectListPage /> },
      { path: 'projects/new', element: <CreateProjectPage /> },
      { path: 'projects/:id', element: <ProjectDetailPage /> },
      { path: 'projects/:id/kpis/new', element: <CreateKpiPage /> },
      { path: 'projects/:id/kpis/:kpiId', element: <KpiDetailPage /> },
    ],
  },
]);
