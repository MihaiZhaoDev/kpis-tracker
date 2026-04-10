export enum KpiValueType {
  PERCENTAGE = 'percentage',
  CURRENCY = 'currency',
  INTEGER = 'integer',
  DECIMAL = 'decimal',
}

export enum KpiStatus {
  COMPLETED = 'completed',
  ON_TRACK = 'on_track',
  AT_RISK = 'at_risk',
  BEHIND = 'behind',
}

export enum KpiCategory {
  FINANCIAL = 'financial',
  ENGAGEMENT = 'engagement',
  DELIVERY = 'delivery',
  QUALITY = 'quality',
  GROWTH = 'growth',
  CUSTOM = 'custom',
}
