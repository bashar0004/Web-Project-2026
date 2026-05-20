import "./AboutPage.css";

const teamMembers = [
  {
    name: "Bashar Tummalieh",
    id: "2232140",
    email: "zanybashar098@gmail.com",
    role: "Main Page & Movie Display",
    emoji: "🎬",
  },
  {
    name: "Zaid Osama Ajami",
    id: "2232362",
    email: "",
    role: "Login & Register Pages",
    emoji: "🔐",
  },
  {
    name: "Rana Ibrahim Shari",
    id: "2233040",
    email: "",
    role: "Header & Navigation",
    emoji: "🧭",
  },
  {
    name: "Maria Malek Almomani",
    id: "2338946",
    email: "",
    role: "About Page",
    emoji: "🎬",
  },
];

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-section">
        <h1 className="about-title">About CineRate</h1>

        <p className="about-text">
          CineRate is a web application that allows users to browse, search,
          filter, and sort a curated collection of movies — all powered by
          client-side logic and a clean, cinematic UI.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">👥 Our Team</h2>

        <div className="team-grid">
          {teamMembers.map((m) => (
            <div className="member-card" key={m.name}>
              <div className="member-emoji">{m.emoji}</div>
              <h3 className="member-name">{m.name}</h3>
              <p className="member-role">{m.role}</p>

              <div className="member-meta">
                <span>🆔 {m.id}</span>
                {m.email && <span>✉️ {m.email}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">🎞️ Project Info</h2>

        <p className="about-text">
          The project uses React for the frontend, Express for the backend, and
          MongoDB for storing movie and user data.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;