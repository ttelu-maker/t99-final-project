import { useEffect, useState } from "react";
import api from "../api";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Reports() {
  const [chart, setChart] = useState(null);


  useEffect(() => {
    api.get("/api/reports-chart").then((res) => setChart(res.data)).catch(console.error);
  }, []);

  if (!chart) return <p>Loading chart...</p>;

  return (
    <section aria-labelledby="reports-heading">
      <h2 id="reports-heading">{chart.title}</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis label={{ value: chart.yLabel, angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Line type="monotone" dataKey="capacityMW" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p>
        This chart shows a scenario for how installed capacity of tandem panels could grow from 2025
        to 2030 as production scales toward gigawatt levels.
      </p>
    </section>
  );
}
