import { useState } from 'react';
import { Input, Textarea, Button } from '@wsp/ui';

interface ProjectFormProps {
  initialData?: { name: string; description?: string };
  onSubmit: (data: { name: string; description?: string }) => Promise<void>;
  submitLabel: string;
}

export function ProjectForm({ initialData, onSubmit, submitLabel }: ProjectFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ name, description: description || undefined });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
      <Input
        label="Project Name"
        placeholder="My Project"
        value={name}
        onChange={setName}
        isRequired
      />
      <Textarea
        label="Description"
        placeholder="Describe your project..."
        value={description}
        onChange={setDescription}
      />
      <Button type="submit" color="primary" isLoading={isLoading}>
        {submitLabel}
      </Button>
    </form>
  );
}
