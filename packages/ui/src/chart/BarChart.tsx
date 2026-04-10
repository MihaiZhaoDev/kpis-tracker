import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface BarChartSeries { key: string; color: string; name: string; }
export interface BarChartProps { data: Record<string, unknown>[]; xKey: string; series: BarChartSeries[]; height?: number; stacked?: boolean; }

export function BarChart({ data, xKey, series, height = 300, stacked }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey={xKey} /><YAxis /><Tooltip /><Legend />
        {series.map((s) => (<Bar key={s.key} dataKey={s.key} fill={s.color} name={s.name} stackId={stacked ? 'stack' : undefined} />))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
