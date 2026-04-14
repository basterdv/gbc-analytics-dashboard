// 'use client'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
//
// export default function Chart({ data }: { data: any[] }) {
//   // Вместо ResponsiveContainer используем фиксированные размеры.
//   // Это гарантирует отсутствие ошибок замера ширины.
//   return (
//     <div className="flex justify-center overflow-hidden">
//       <LineChart
//         width={800}
//         height={400}
//         data={data}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//         <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} />
//         <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="sum"
//           stroke="#2563eb"
//           strokeWidth={4}
//           dot={{ r: 4, fill: '#2563eb' }}
//         />
//       </LineChart>
//     </div>
//   )
// }
'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Регистрируем модули Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function OrdersChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Выручка (₸)',
        data: data.map(d => d.sum),
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4, // Сглаживание линии
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#2563eb',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9' },
        ticks: { callback: (value: any) => value.toLocaleString() + ' ₸' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}
