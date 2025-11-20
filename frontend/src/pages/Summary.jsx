// src/pages/Summary.jsx
import { useEffect, useState } from "react";
import api from "../api";
import SummaryChart from "../components/SummaryChart"; // your chart

export default function Summary() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchChart() {
      try {
        const res = await api.get("/api/summary-chart");
        if (isMounted) setChartData(res.data);
      } catch (err) {
        console.error("Error loading summary chart:", err);
        if (isMounted) setError("Failed to load chart. Please try logging in again.");
      }
    }

    fetchChart();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card">
      <h1 className="page-title">Summary</h1>
      <p className="page-subtitle">
        This page summarizes why perovskite–silicon tandem solar panels are an important clean-energy
        innovation. The chart below compares the module efficiency of a conventional silicon panel
        against the Oxford PV tandem panel using dynamic backend data.
      </p>

      {error && <p className="error-text">{error}</p>}
      {!chartData && !error && <p>Loading chart…</p>}

      {chartData && (
        <div className="chart-section">
          <h2 className="chart-title">{chartData.title}</h2>
          <SummaryChart chart={chartData} />
          <p className="chart-caption">
            The tandem panel reaches roughly <strong>24.5%</strong> efficiency compared with around{" "}
            <strong>20%</strong> for a typical silicon module. This means more clean electricity from
            the same roof or land area.
          </p>
          <p className="helper-text">
            Source: {chartData.source}
          </p>
        </div>
      )}
    </section>
  );
}
