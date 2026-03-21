import { useState, useEffect, useRef } from "react";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveSection(id);
            break;
          }
        }
      }
      // Intersection observer alternative
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.8) {
            setVisibleSections((prev) => new Set([...prev, id]));
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const skills = [
    { category: "Languages", items: ["Java", "JavaScript", "SQL"], icon: "⟨/⟩" },
    { category: "Backend", items: ["Spring Boot", "REST APIs", "JDBC", "JavaFX"], icon: "⚙" },
    { category: "Frontend", items: ["React JS", "HTML5", "CSS3", "Bootstrap"], icon: "◈" },
    { category: "Database", items: ["MySQL", "Schema Design", "Normalization"], icon: "⬡" },
    { category: "Tools", items: ["Git", "GitHub", "Maven", "IntelliJ", "VS Code", "Postman"], icon: "⚡" },
    { category: "Concepts", items: ["OOP", "DSA", "Design Patterns", "MVC", "Agile"], icon: "△" },
  ];

  const projects = [
    {
      title: "Employee Management System",
      tag: "FREELANCE • 2025",
      tech: ["Java", "JDBC", "MySQL", "HTML/CSS/JS"],
      desc: "Full-stack system with CRUD ops, attendance tracking, role-based access control, and interactive dashboards managing 100+ employee profiles.",
      highlight: "Client Delivered",
    },
    {
      title: "Hotel Booking Platform",
      tag: "PROJECT • 2025",
      tech: ["Java", "MySQL", "JDBC", "HTML/CSS/JS"],
      desc: "Real-time room availability tracking, payment gateway integration, and normalized schema with transaction-safe queries.",
      highlight: "5+ DB Tables",
    },
    {
      title: "Banking Transaction System",
      tag: "PROJECT • 2025",
      tech: ["Java", "JavaFX", "Swing", "MySQL"],
      desc: "Desktop banking app with account management, fund transfers, OOP design patterns, and persistent MySQL storage.",
      highlight: "Desktop App",
    },
  ];

  const sectionVisible = (id) => visibleSections.has(id);

  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      background: "#0a0a0f",
      color: "#e8e8ec",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #2a2a3e; border-radius: 3px; }

        .grain {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 999; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .glow-orb {
          position: fixed; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
          top: -200px; right: -200px;
          animation: orbFloat 8s ease-in-out infinite;
        }

        .glow-orb-2 {
          position: fixed; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
          bottom: -100px; left: -100px;
          animation: orbFloat2 10s ease-in-out infinite;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-50px, 50px); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -40px); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .fade-up { opacity: 0; transform: translateY(30px); transition: all 0.7s cubic-bezier(0.16,1,0.3,1); }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        .nav-link {
          position: relative; color: #8888a0; text-decoration: none;
          font-size: 13px; font-weight: 500; letter-spacing: 1px;
          text-transform: uppercase; padding: 8px 0; transition: color 0.3s;
          cursor: pointer; background: none; border: none;
          font-family: 'JetBrains Mono', monospace;
        }
        .nav-link:hover, .nav-link.active { color: #e8e8ec; }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px; background: #6366f1; transition: width 0.3s;
        }
        .nav-link.active::after, .nav-link:hover::after { width: 100%; }

        .tag {
          display: inline-block; padding: 4px 12px; border-radius: 20px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
          font-family: 'JetBrains Mono', monospace;
          background: rgba(99,102,241,0.1); color: #818cf8; border: 1px solid rgba(99,102,241,0.2);
        }

        .skill-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; padding: 24px; transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          position: relative; overflow: hidden;
        }
        .skill-card:hover {
          background: rgba(99,102,241,0.05); border-color: rgba(99,102,241,0.2);
          transform: translateY(-4px);
        }
        .skill-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent);
          opacity: 0; transition: opacity 0.4s;
        }
        .skill-card:hover::before { opacity: 1; }

        .project-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px; padding: 32px; transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
          position: relative; overflow: hidden;
        }
        .project-card:hover {
          border-color: rgba(99,102,241,0.3);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(99,102,241,0.08);
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: #6366f1; color: white;
          border: none; border-radius: 12px; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.3s; text-decoration: none;
          font-family: 'Outfit', sans-serif;
        }
        .btn-primary:hover { background: #5558e6; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.3); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: transparent; color: #e8e8ec;
          border: 1px solid rgba(255,255,255,0.15); border-radius: 12px;
          font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s;
          text-decoration: none; font-family: 'Outfit', sans-serif;
        }
        .btn-outline:hover { border-color: #6366f1; color: #818cf8; transform: translateY(-2px); }

        .timeline-dot {
          width: 12px; height: 12px; border-radius: 50%; background: #6366f1;
          border: 2px solid #0a0a0f; box-shadow: 0 0 0 3px rgba(99,102,241,0.3);
        }

        .highlight-badge {
          display: inline-block; padding: 4px 10px; border-radius: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
          background: rgba(16,185,129,0.1); color: #34d399; border: 1px solid rgba(16,185,129,0.2);
          font-family: 'JetBrains Mono', monospace;
        }

        .stat-number {
          font-size: 36px; font-weight: 800; color: #6366f1;
          font-family: 'JetBrains Mono', monospace; line-height: 1;
        }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hero-grid { flex-direction: column !important; text-align: center !important; }
          .hero-title { font-size: 36px !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-direction: column !important; gap: 20px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .section-padding { padding: 60px 20px !important; }
        }
      `}</style>

      <div className="grain" />
      <div className="glow-orb" />
      <div className="glow-orb-2" />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,10,15,0.8)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={() => scrollTo("hero")} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: "#e8e8ec",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ color: "#6366f1" }}>{"<"}</span>SK<span style={{ color: "#6366f1" }}>{"/>"}</span>
        </button>

        <div className="nav-desktop" style={{ display: "flex", gap: 32 }}>
          {navItems.map((item) => (
            <button key={item.id} className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </div>

        <a href="mailto:shubhamy1024@gmail.com" className="btn-primary"
          style={{ padding: "8px 20px", fontSize: 12, borderRadius: 8 }}>
          Hire Me
        </a>
      </nav>

      {/* HERO */}
      <section id="hero" className="section-padding" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px 40px 80px", position: "relative",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
          <div style={{
            opacity: isLoaded ? 1 : 0, transform: isLoaded ? "none" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#6366f1",
              letterSpacing: 2, marginBottom: 20, display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ display: "inline-block", width: 30, height: 1, background: "#6366f1" }} />
              HELLO WORLD, I'M
            </div>

            <h1 className="hero-title" style={{
              fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginBottom: 20,
              background: "linear-gradient(135deg, #e8e8ec 0%, #8888a0 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Shubham Kumar<br/>Yadav
            </h1>

            <p style={{
              fontSize: 20, color: "#8888a0", maxWidth: 550, lineHeight: 1.6, marginBottom: 12,
              fontWeight: 300,
            }}>
              <span style={{ color: "#e8e8ec", fontWeight: 500 }}>Full Stack Java Developer</span> who builds
              web & desktop applications that solve real problems.
            </p>

            <p style={{ fontSize: 14, color: "#555568", marginBottom: 36, fontFamily: "'JetBrains Mono', monospace" }}>
              Based in Mumbai, India • B.Tech CS '25
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="mailto:shubhamy1024@gmail.com" className="btn-primary">
                Let's Talk →
              </a>
              <a href="https://github.com/shubham-yadav024" target="_blank" className="btn-outline">
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row" style={{
            display: "flex", gap: 48, marginTop: 80,
            opacity: isLoaded ? 1 : 0, transition: "all 1s 0.3s cubic-bezier(0.16,1,0.3,1)",
            transform: isLoaded ? "none" : "translateY(20px)",
          }}>
            {[
              { num: "3+", label: "Projects Delivered" },
              { num: "100+", label: "Profiles Managed" },
              { num: "15+", label: "Students Mentored" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="stat-number">{stat.num}</div>
                <div style={{ fontSize: 12, color: "#555568", marginTop: 4, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-padding" style={{ padding: "100px 40px", position: "relative" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}
          className={`fade-up ${sectionVisible("about") ? "visible" : ""}`}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#6366f1", letterSpacing: 2, marginBottom: 12 }}>
            // ABOUT ME
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24 }}>
            Turning ideas into <span style={{ color: "#6366f1" }}>working software</span>
          </h2>
          <p style={{ fontSize: 16, color: "#8888a0", lineHeight: 1.8, marginBottom: 16 }}>
            I'm a B.Tech Computer Science graduate from AKTU with a passion for building applications
            that make a real difference. My journey started with Java and has expanded into full-stack
            development — from designing database schemas to crafting responsive user interfaces.
          </p>
          <p style={{ fontSize: 16, color: "#8888a0", lineHeight: 1.8 }}>
            As a freelance developer, I've experienced the full product lifecycle — understanding client
            needs, architecting solutions, writing clean code, and deploying to production. I thrive on
            the challenge of turning complex requirements into elegant, functional applications.
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section-padding" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className={`fade-up ${sectionVisible("skills") ? "visible" : ""}`}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#6366f1", letterSpacing: 2, marginBottom: 12 }}>
              // TECH STACK
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 40 }}>
              Skills & <span style={{ color: "#6366f1" }}>Technologies</span>
            </h2>
          </div>

          <div className="skills-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
          }}>
            {skills.map((skill, i) => (
              <div key={i} className={`skill-card fade-up ${sectionVisible("skills") ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{skill.icon}</div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: "#6366f1", letterSpacing: 1.5,
                  fontFamily: "'JetBrains Mono', monospace", marginBottom: 12,
                  textTransform: "uppercase",
                }}>
                  {skill.category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {skill.items.map((item, j) => (
                    <span key={j} style={{
                      padding: "4px 10px", borderRadius: 6, fontSize: 12, color: "#b0b0c0",
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section-padding" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className={`fade-up ${sectionVisible("experience") ? "visible" : ""}`}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#6366f1", letterSpacing: 2, marginBottom: 12 }}>
              // EXPERIENCE
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 40 }}>
              Work <span style={{ color: "#6366f1" }}>Experience</span>
            </h2>
          </div>

          <div className={`fade-up ${sectionVisible("experience") ? "visible" : ""}`} style={{
            display: "flex", gap: 24, transitionDelay: "0.2s",
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div className="timeline-dot" />
              <div style={{ width: 1, flex: 1, background: "rgba(99,102,241,0.2)" }} />
            </div>

            <div style={{ flex: 1, paddingBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Freelance Java Developer</h3>
                  <p style={{ fontSize: 14, color: "#8888a0" }}>Self-Employed • Mumbai, India</p>
                </div>
                <span className="tag">Jan 2025 — Present</span>
              </div>

              <ul style={{ marginTop: 16, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Developed and delivered a full-stack Employee Management System with CRUD operations, attendance tracking, and role-based access control using Java, JDBC, and MySQL.",
                  "Built responsive frontend with dynamic form validation, search/filter, and interactive dashboards managing 100+ employee profiles.",
                  "Managed complete project lifecycle — requirement analysis, database design, development, testing, and client deployment.",
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: 14, color: "#8888a0", lineHeight: 1.7 }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-padding" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className={`fade-up ${sectionVisible("projects") ? "visible" : ""}`}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#6366f1", letterSpacing: 2, marginBottom: 12 }}>
              // PORTFOLIO
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 40 }}>
              Featured <span style={{ color: "#6366f1" }}>Projects</span>
            </h2>
          </div>

          <div className="projects-grid" style={{
            display: "grid", gridTemplateColumns: "1fr", gap: 20,
          }}>
            {projects.map((proj, i) => (
              <div key={i} className={`project-card fade-up ${sectionVisible("projects") ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.15}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{proj.title}</h3>
                    <span style={{ fontSize: 12, color: "#555568", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
                      {proj.tag}
                    </span>
                  </div>
                  <span className="highlight-badge">{proj.highlight}</span>
                </div>

                <p style={{ fontSize: 14, color: "#8888a0", lineHeight: 1.7, marginBottom: 16 }}>{proj.desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {proj.tech.map((t, j) => (
                    <span key={j} style={{
                      padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                      color: "#818cf8", background: "rgba(99,102,241,0.08)",
                      border: "1px solid rgba(99,102,241,0.15)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-padding" style={{ padding: "100px 40px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div className={`fade-up ${sectionVisible("contact") ? "visible" : ""}`}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#6366f1", letterSpacing: 2, marginBottom: 12 }}>
              // GET IN TOUCH
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>
              Let's Build Something <span style={{ color: "#6366f1" }}>Together</span>
            </h2>
            <p style={{ fontSize: 16, color: "#8888a0", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
              I'm actively looking for full-stack developer opportunities. If you have an opening or just want to say hi, feel free to reach out!
            </p>
          </div>

          <div className="contact-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40,
          }}>
            {[
              { icon: "✉", label: "Email", value: "shubhamy1024@gmail.com", href: "mailto:shubhamy1024@gmail.com" },
              { icon: "in", label: "LinkedIn", value: "Shubham Kumar Yadav", href: "https://linkedin.com/in/shubham-kumar-yadav-java-developer" },
              { icon: "⟨⟩", label: "GitHub", value: "shubham-yadav024", href: "https://github.com/shubham-yadav024" },
            ].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                className={`skill-card fade-up ${sectionVisible("contact") ? "visible" : ""}`}
                style={{ textDecoration: "none", color: "inherit", textAlign: "center", transitionDelay: `${i * 0.1}s`, cursor: "pointer" }}>
                <div style={{ fontSize: 24, marginBottom: 8, color: "#6366f1" }}>{c.icon}</div>
                <div style={{ fontSize: 11, color: "#555568", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 4 }}>
                  {c.label}
                </div>
                <div style={{ fontSize: 13, color: "#b0b0c0" }}>{c.value}</div>
              </a>
            ))}
          </div>

          <a href="mailto:shubhamy1024@gmail.com" className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>
            Say Hello →
          </a>

          <div style={{
            marginTop: 80, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)",
            fontSize: 12, color: "#333348", fontFamily: "'JetBrains Mono', monospace",
          }}>
            Designed & Built by Shubham Kumar Yadav • 2025
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;