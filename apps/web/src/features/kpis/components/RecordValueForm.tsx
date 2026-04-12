import { useState } from 'react';
import { Input, Textarea, Button } from '@wsp/ui';

interface RecordValueFormProps {
  onSubmit: (data: { actualValue: number; notes?: string }) => Promise<void>;
}

export function RecordValueForm({ onSubmit }: RecordValueFormProps) {
  const [actualValue, setActualValue] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({
        actualValue: Number(actualValue),
        notes: notes || undefined,
      });
      setActualValue('');
      setNotes('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        label="Actual Value"
        type="number"
        placeholder="Enter current value"
        value={actualValue}
        onChange={setActualValue}
        isRequired
      />
      <Textarea
        label="Notes"
        placeholder="Optional notes..."
        value={notes}
        onChange={setNotes}
        minRows={2}
        maxRows={4}
      />
      <Button type="submit" color="primary" size="sm" isLoading={isLoading}>
        Record Value
      </Button>
    </form>
  );
}
