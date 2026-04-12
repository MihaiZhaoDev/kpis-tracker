import { useState } from 'react';
import { Input, Select, Textarea, Button } from '@wsp/ui';
import { KpiValueType, KpiCategory } from '@wsp/shared';

interface KpiFormProps {
  onSubmit: (data: {
    name: string;
    description?: string;
    category?: string;
    unit: string;
    valueType: string;
    targetValue: number;
  }) => Promise<void>;
}

const valueTypeOptions = Object.values(KpiValueType).map((v) => ({
  label: v.charAt(0).toUpperCase() + v.slice(1),
  value: v,
}));

const categoryOptions = Object.values(KpiCategory).map((v) => ({
  label: v.charAt(0).toUpperCase() + v.slice(1),
  value: v,
}));

export function KpiForm({ onSubmit }: KpiFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [valueType, setValueType] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({
        name,
        description: description || undefined,
        category: category || undefined,
        unit,
        valueType,
        targetValue: Number(targetValue),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
      <Input label="KPI Name" placeholder="e.g. Monthly Revenue" value={name} onChange={setName} isRequired />
      <Textarea label="Description" placeholder="What does this KPI track?" value={description} onChange={setDescription} />
      <Select label="Category" placeholder="Select category" options={categoryOptions} selectedKey={category} onChange={setCategory} />
      <Select label="Value Type" placeholder="Select type" options={valueTypeOptions} selectedKey={valueType} onChange={setValueType} isRequired />
      <Input label="Unit" placeholder="e.g. USD, %, count" value={unit} onChange={setUnit} isRequired />
      <Input label="Target Value" type="number" placeholder="e.g. 10000" value={targetValue} onChange={setTargetValue} isRequired />
      <Button type="submit" color="primary" isLoading={isLoading}>
        Create KPI
      </Button>
    </form>
  );
}
