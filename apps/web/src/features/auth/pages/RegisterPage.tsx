import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardBody } from '@wsp/ui';
import { useAuth } from '../../../hooks/useAuth';
import { RegisterForm } from '../components/RegisterForm';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      setError('');
      await register(email, password, name);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">WSP Tracker</h1>
        <p className="text-center text-gray-500 mb-6">Create your account</p>
        <Card>
          <CardBody className="p-6">
            <RegisterForm onSubmit={handleRegister} error={error} />
            <p className="text-sm text-center mt-4 text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium">
                Sign in
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
