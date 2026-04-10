import { Input as HeroInput } from '@heroui/react';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
}

export function Input({
  label, placeholder, value, defaultValue, type = 'text',
  isRequired, isInvalid, errorMessage, onChange, name, className,
}: InputProps) {
  return (
    <HeroInput
      label={label} placeholder={placeholder} value={value} defaultValue={defaultValue}
      type={type} isRequired={isRequired} isInvalid={isInvalid} errorMessage={errorMessage}
      onValueChange={onChange} name={name} className={className}
    />
  );
}
