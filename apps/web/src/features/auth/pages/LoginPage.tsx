import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardBody } from '@wsp/ui';
import { useAuth } from '../../../hooks/useAuth';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      setError('');
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">WSP Tracker</h1>
        <p className="text-center text-gray-500 mb-6">Sign in to your account</p>
        <Card>
          <CardBody className="p-6">
            <LoginForm onSubmit={handleLogin} error={error} />
            <p className="text-sm text-center mt-4 text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-medium">
                Sign up
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
