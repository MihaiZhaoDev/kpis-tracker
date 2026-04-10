import { Textarea as HeroTextarea } from '@heroui/react';

export interface TextareaProps {
  label?: string; placeholder?: string; value?: string;
  isRequired?: boolean; isInvalid?: boolean; errorMessage?: string;
  onChange?: (value: string) => void; minRows?: number; maxRows?: number; className?: string;
}

export function Textarea({
  label, placeholder, value, isRequired, isInvalid, errorMessage,
  onChange, minRows = 3, maxRows = 6, className,
}: TextareaProps) {
  return (
    <HeroTextarea label={label} placeholder={placeholder} value={value}
      isRequired={isRequired} isInvalid={isInvalid} errorMessage={errorMessage}
      onValueChange={onChange} minRows={minRows} maxRows={maxRows} className={className}
    />
  );
}
