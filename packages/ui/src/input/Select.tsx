import { Select as HeroSelect, SelectItem } from '@heroui/react';

export interface SelectOption { label: string; value: string; }

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  selectedKey?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Select({
  label, placeholder, options, selectedKey, isRequired, isInvalid,
  errorMessage, onChange, className,
}: SelectProps) {
  return (
    <HeroSelect
      label={label} placeholder={placeholder}
      selectedKeys={selectedKey ? [selectedKey] : undefined}
      isRequired={isRequired} isInvalid={isInvalid} errorMessage={errorMessage}
      onSelectionChange={(keys) => { const selected = Array.from(keys)[0] as string; onChange?.(selected); }}
      className={className}
    >
      {options.map((opt) => (
        <SelectItem key={opt.value}>{opt.label}</SelectItem>
      ))}
    </HeroSelect>
  );
}
