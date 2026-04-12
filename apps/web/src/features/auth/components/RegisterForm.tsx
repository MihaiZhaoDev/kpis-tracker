import { useState } from 'react';
import { Input, Button } from '@wsp/ui';

interface RegisterFormProps {
  onSubmit: (email: string, password: string, name: string) => Promise<void>;
  error?: string;
}

export function RegisterForm({ onSubmit, error }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(email, password, name);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Name"
        placeholder="Your full name"
        value={name}
        onChange={setName}
        isRequired
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={setEmail}
        isRequired
      />
      <Input
        label="Password"
        type="password"
        placeholder="Min 8 characters"
        value={password}
        onChange={setPassword}
        isRequired
      />
      {error && <p className="text-sm text-danger">{error}</p>}
      <Button type="submit" color="primary" fullWidth isLoading={isLoading}>
        Create Account
      </Button>
    </form>
  );
}
