import api from '../../lib/axios';
import type { LoginInput, RegisterInput } from '@wsp/shared';

export const authApi = {
  login: (data: LoginInput) => api.post('/auth/login', data),
  register: (data: RegisterInput) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
};
