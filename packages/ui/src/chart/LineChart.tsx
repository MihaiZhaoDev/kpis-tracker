import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export interface LineChartSeries { key: string; color: string; name: string; dashed?: boolean; }
export interface LineChartProps { data: Record<string, unknown>[]; xKey: string; series: LineChartSeries[]; height?: number; referenceLine?: { y: number; label: string; color: string }; }

export function LineChart({ data, xKey, series, height = 300, referenceLine }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey={xKey} /><YAxis /><Tooltip /><Legend />
        {series.map((s) => (<Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} name={s.name} strokeDasharray={s.dashed ? '5 5' : undefined} dot={{ r: 3 }} />))}
        {referenceLine && (<ReferenceLine y={referenceLine.y} label={referenceLine.label} stroke={referenceLine.color} strokeDasharray="5 5" />)}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
