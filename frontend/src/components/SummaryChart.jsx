// src/components/SummaryChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function SummaryChart({ chart }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={chart.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="type"
            angle={-20}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            label={{
              value: chart.yLabel,
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Bar dataKey="efficiency" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
