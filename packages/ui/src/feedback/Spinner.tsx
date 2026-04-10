import { Spinner as HeroSpinner } from '@heroui/react';

export interface SpinnerProps { size?: 'sm' | 'md' | 'lg'; label?: string; className?: string; }

export function Spinner({ size = 'md', label, className }: SpinnerProps) {
  return <HeroSpinner size={size} label={label} className={className} />;
}
