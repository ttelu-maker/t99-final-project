// src/components/ReportsChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ReportsChart({ chart }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={chart.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            label={{
              value: chart.yLabel,
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="capacityMW" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
