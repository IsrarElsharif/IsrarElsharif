const studentData = {
  name: "Mohammed Abdallah",
  role: "Student",
  specialization: "Data Science & ML",
  interests: ["Python", "Machine Learning", "Data Visualization", "SQL", "Statistics"],
  enrolled: [
    { id: 1, progress: 65 },
    { id: 3, progress: 20 },
    { id: 5, progress: 90 },
  ],
  recommended: [2, 6, 7],
};

export default function DashboardPage({ user, setPage, courses, t }) {
  const L = (key, fallback) => (typeof t === "function" ? t(key) : fallback);
  const displayUser = user || studentData;
  const name = displayUser.name || studentData.name;
  const role = displayUser.role || "Student";
  const specialization = displayUser.specialization || studentData.specialization;
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const enrolled = studentData.enrolled.map((e) => ({ ...courses.find((c) => c.id === e.id), progress: e.progress }));
  const recommended = studentData.recommended.map((id) => courses.find((c) => c.id === id));

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div className="dash-welcome">{L("dashboard.welcome", "Welcome back,")} {name.split(" ")[0]} 👋</div>
        <div className="dash-sub">{L("dashboard.subtitle", "Your personalized learning hub — tailored for")} {specialization}</div>
      </div>
      <div className="dash-grid">
        <div className="dash-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-name">{name}</div>
            <div className="profile-role">{role.charAt(0).toUpperCase() + role.slice(1)}</div>
            <div className="profile-spec">{specialization}</div>
            <div className="profile-progress" style={{ marginTop: "1.25rem" }}>
              <div className="progress-label"><span style={{ color: "var(--text2)", fontSize: "0.75rem" }}>{L("dashboard.overallProgress", "Overall Progress")}</span><span style={{ color: "var(--cyan)", fontSize: "0.75rem" }}>58%</span></div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: "58%" }} /></div>
            </div>
          </div>
          <div className="sidebar-card">
            <div className="sidebar-title">{L("dashboard.interests", "My Interests")}</div>
            <div>
              {studentData.interests.map((i) => <span key={i} className="interest-tag" style={{ cursor: "pointer" }} onClick={() => setPage && setPage("courses")} title={L("dashboard.browseTopic", "Browse this topic")}>{i}</span>)}
            </div>
          </div>
          <div className="sidebar-card">
            <div className="sidebar-title">{L("dashboard.quickStats", "Quick Stats")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[["3", L("dashboard.enrolled", "Enrolled")], ["1", L("dashboard.completed", "Completed")], ["58%", L("dashboard.avgProgress", "Avg Progress")], ["4.8", L("dashboard.avgRating", "Avg Rating")]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center", padding: "0.75rem", background: "var(--bg)", borderRadius: "10px" }}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>{v}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text3)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dash-main">
          <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 14, padding: "1.5rem" }}>
            <div className="dash-section-title">{L("dashboard.myCourses", "My Courses")}</div>
            <div className="enrolled-list">
              {enrolled.map((c) => (
                <div key={c.id} className="enrolled-card" style={{ cursor: "pointer" }} onClick={() => setPage && setPage("course-" + c.id)}>
                  <div className="enrolled-icon">{c.image}</div>
                  <div style={{ flex: 1 }}>
                    <div className="enrolled-title">{c.title}</div>
                    <div className="enrolled-instructor">{c.instructor}</div>
                    <div className="progress-bar" style={{ maxWidth: "100%" }}>
                      <div className="progress-fill" style={{ width: `${c.progress}%` }} />
                    </div>
                    <div className="enrolled-footer">
                      <span className="enrolled-progress-text">{c.progress}% {L("dashboard.complete", "complete")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 14, padding: "1.5rem" }}>
            <div className="dash-section-title">{L("dashboard.recommended", "Recommended For You")}</div>
            <div className="rec-list">
              {recommended.map((c) => (
                <div key={c.id} className="rec-card" style={{ cursor: "pointer" }} onClick={() => setPage && setPage("course-" + c.id)}>
                  <div className="rec-left">
                    <div className="rec-icon">{c.image}</div>
                    <div>
                      <div className="rec-title">{c.title}</div>
                      <div className="rec-meta">{c.instructor} · {c.level} · {c.duration}</div>
                    </div>
                  </div>
                  <div className="rec-price">${c.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
