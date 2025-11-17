// src/pages/Dashboard.jsx
export default function Dashboard() {
  return (
    <section aria-labelledby="dashboard-heading">
      <h2 id="dashboard-heading">Clean Energy Innovation – Perovskite Tandem Solar</h2>

      <p>
        In this project I focus on a recent clean energy breakthrough: the first commercial
        deployment of perovskite–silicon tandem solar panels in the United States by Oxford PV.
        These next-generation panels stack a thin perovskite cell on top of a traditional silicon
        cell, capturing more of the light spectrum and boosting efficiency by around 20% compared
        with today’s best conventional modules. Higher efficiency means more electricity from the
        same rooftop or solar farm, helping projects deliver more clean power without needing extra
        land or hardware.
      </p>
      <p>
        The initial systems are being installed on commercial sites and utility-scale projects,
        providing a real-world test of performance, durability, and cost. If the technology scales
        as expected, it could speed up solar adoption, lower the levelized cost of energy, and make
        it easier for grids to replace fossil fuels. This innovation also matters for climate goals,
        because every percentage point of extra efficiency reduces materials, transport, and
        installation emissions per unit of energy produced. Overall, tandem perovskite-silicon
        panels represent a practical step change rather than a distant lab experiment, showing how
        materials science and clean energy policy can work together to accelerate decarbonization.
      </p>
      <p>
        <strong>Source:</strong>{" "}
        <a
          href="https://www.oxfordpv.com/press-releases/oxford-pv-solar-technology-patent"
          target="_blank"
          rel="noopener noreferrer"
        >
          Oxford PV – 20% more powerful tandem solar panels enter commercial use for the first time
          in the US
        </a>
      </p>

      <h3>Technical Stack and Infrastructure</h3>
      <p>
        This web application is implemented as a fully decoupled single page application with a REST
        backend. The frontend is built with React, bundled as static files and served by NGINX on
        port 80. The backend is implemented in Python using FastAPI, running independently on port
        3000 and exposing JSON endpoints for authentication and chart data. JSON Web Tokens (JWT)
        are used for login and to protect all Dashboard, Summary, and Reports API calls. The
        database layer uses MySQL to persist basic project data and demonstrate connectivity, while
        the chart data is generated from realistic values based on the source article. The system
        architecture follows a simple layered design: client SPA → NGINX → FastAPI API → database,
        making it easy to extend with additional reports, users, or more complex clean-energy
        analytics in the future.
      </p>
    </section>
  );
}
