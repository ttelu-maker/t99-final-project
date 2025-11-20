// src/pages/Reports.jsx
import { useEffect, useState } from "react";
import api from "../api";
import ReportsChart from "../components/ReportsChart";

export default function Reports() {
  const [chart, setChart] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchChart() {
      try {
        const res = await api.get("/api/reports-chart");
        if (active) setChart(res.data);
      } catch (err) {
        console.error("Error loading reports chart:", err);
        if (active) setError("Failed to load chart. Please try logging in again.");
      }
    }

    fetchChart();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main id="main" style={{ padding: "2rem" }}>
      <p>
        The Reports page looks ahead at future adoption scenarios for tandem
        solar panel deployment. The chart below visualizes potential scaled
        production based on industry growth assumptions.
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && !chart && <p>Loading chart...</p>}

      {chart && (
        <>
          <h2>{chart.title}</h2>
          <ReportsChart chart={chart} />
          <p style={{ marginTop: "1rem" }}>
            Installed capacity could grow from <strong>50 MW</strong> in 2025
            to <strong>2000 MW</strong> by 2030. These are illustrative
            research-based projections showing a possible scale-up path.
          </p>
          <p>
            <strong>Source:</strong> {chart.note}
          </p>
        </>
      )}
    </main>
  );
}
