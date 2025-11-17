import { useEffect, useState } from "react";
import api from "../api";
// import your chart component here

export default function Summary() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchChart() {
      try {
        // 👇 IMPORTANT: use /api/summary-chart
        const res = await api.get("/api/summary-chart");
        if (isMounted) {
          setChartData(res.data);
        }
      } catch (err) {
        console.error("Error loading summary chart:", err);
        if (isMounted) {
          setError("Failed to load chart. Please try logging in again.");
        }
      }
    }

    fetchChart();
    return () => { isMounted = false; };
  }, []);

  if (error) return <p>{error}</p>;
  if (!chartData) return <p>Loading chart...</p>;

  // render chart with chartData here
  return (
    <main id="main">
      <h1>T99 Clean Energy Dashboard</h1>
      {/* your chart component */}
      {/* <SummaryChart chart={chartData} /> for example */}
      <p style={{ maxWidth: "600px" }}>{chartData.source}</p>
    </main>
  );
}
