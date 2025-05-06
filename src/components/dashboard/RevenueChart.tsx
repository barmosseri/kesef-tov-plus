
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data - in a real app this would come from API
const data = [
  { name: 'ינואר', הכנסות: 12000, הוצאות: 8000 },
  { name: 'פברואר', הכנסות: 14000, הוצאות: 9000 },
  { name: 'מרץ', הכנסות: 18000, הוצאות: 12000 },
  { name: 'אפריל', הכנסות: 16000, הוצאות: 10000 },
  { name: 'מאי', הכנסות: 15000, הוצאות: 9500 },
  { name: 'יוני', הכנסות: 19000, הוצאות: 11000 },
  { name: 'יולי', הכנסות: 0, הוצאות: 0 },
  { name: 'אוגוסט', הכנסות: 0, הוצאות: 0 },
  { name: 'ספטמבר', הכנסות: 0, הוצאות: 0 },
  { name: 'אוקטובר', הכנסות: 0, הוצאות: 0 },
  { name: 'נובמבר', הכנסות: 0, הוצאות: 0 },
  { name: 'דצמבר', הכנסות: 0, הוצאות: 0 },
];

interface RevenueChartProps {
  year: number;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ year }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-96 ltr">
      <h3 className="text-lg font-semibold mb-4 rtl">הכנסות והוצאות {year}</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `₪${value}`} />
          <Legend />
          <Bar dataKey="הכנסות" fill="#4BAE9B" radius={[4, 4, 0, 0]} />
          <Bar dataKey="הוצאות" fill="#F59E0B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
