import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export interface DonutChartData { name: string; value: number; color: string; }
export interface DonutChartProps { data: DonutChartData[]; width?: number; height?: number; }

export function DonutChart({ data, height = 300 }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
          {data.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
        </Pie>
        <Tooltip /><Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
