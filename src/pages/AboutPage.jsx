import "./AboutPage.css";

const teamMembers = [
  {
    name: "Bashar Tummalieh",
    id: "2232140",
    email: "zahybashar098@gmail.com",
    role: "Main Page & Movie Display",
    emoji: "🎬",
  },
  {
    name: "Team Member 2",
    id: "———",
    email: "———",
    role: "Login & Register Pages",
    emoji: "🔐",
  },
  {
    name: "Team Member 3",
    id: "———",
    email: "———",
    role: "Header & Navigation",
    emoji: "🧭",
  },
];

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-hero-content">
          <p className="about-eyebrow">Web Applications Project — 2026</p>
          <h1 className="about-title">About <span className="about-accent">CineRate</span></h1>
          <p className="about-desc">
            CineRate is a front-end web application built with React.js as part of our
            Web Applications Programming and Engineering course. It allows users to
            browse, search, filter, and sort a curated collection of movies — all
            powered by client-side logic and a clean, cinematic UI.
          </p>
        </div>
      </div>

      {/* Project Info */}
      <section className="about-section">
        <h2 className="section-title">🛠 Tech Stack</h2>
        <div className="tech-grid">
          {[
            { icon: "⚛️", label: "React.js", desc: "SPA with functional components & hooks" },
            { icon: "🔀", label: "React Router", desc: "Client-side routing between pages" },
            { icon: "🎨", label: "CSS Modules", desc: "Custom dark cinematic design system" },
            { icon: "☁️", label: "Render.com", desc: "Live deployment & hosting" },
            { icon: "🐙", label: "GitHub", desc: "Version control & team collaboration" },
          ].map((t) => (
            <div className="tech-card" key={t.label}>
              <span className="tech-icon">{t.icon}</span>
              <strong>{t.label}</strong>
              <span>{t.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="about-section">
        <h2 className="section-title">👥 Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((m) => (
            <div className="member-card" key={m.name}>
              <div className="member-emoji">{m.emoji}</div>
              <h3 className="member-name">{m.name}</h3>
              <p className="member-role">{m.role}</p>
              <div className="member-meta">
                <span>🪪 {m.id}</span>
                <span>✉️ {m.email}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
