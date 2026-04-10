import { Chip } from '@heroui/react';

export type StatusType = 'completed' | 'on_track' | 'at_risk' | 'behind';

const statusConfig: Record<StatusType, { color: 'success' | 'primary' | 'warning' | 'danger'; label: string }> = {
  completed: { color: 'success', label: 'Completed' },
  on_track: { color: 'primary', label: 'On Track' },
  at_risk: { color: 'warning', label: 'At Risk' },
  behind: { color: 'danger', label: 'Behind' },
};

export interface StatusBadgeProps { status: StatusType; size?: 'sm' | 'md' | 'lg'; }

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status];
  return <Chip color={config.color} size={size} variant="flat">{config.label}</Chip>;
}
