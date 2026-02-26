import CourseCard from "../cards/CourseCard";

export default function CenterProfilePage({ slug, setPage, centers, courses, instructors, t }) {
  const center = centers.find((c) => c.slug === slug);
  if (!center) return null;

  const centerCourses = courses.filter((c) => c.center === center.name);
  const centerInstructors = instructors.filter((i) => i.center === center.name);

  return (
    <div className="center-page">
      <div className="center-hero">
        <div className="center-hero-glow" style={{ background: center.color }} />
        <div className="center-hero-content">
          <div className="big-logo" style={{ background: center.color }}>{center.logo}</div>
          <div className="center-hero-name">{center.name}</div>
          <div className="center-hero-tag">{center.tagline}</div>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {center.specialties.map((s) => <span key={s} className="spec-tag">{s}</span>)}
          </div>
          <div className="center-hero-stats">
            <div><div className="ch-stat-val">{center.courses}</div><div className="ch-stat-lbl">{t("cards.courses")}</div></div>
            <div><div className="ch-stat-val">{center.instructors}</div><div className="ch-stat-lbl">{t("cards.instructors")}</div></div>
            <div><div className="ch-stat-val">{center.students.toLocaleString()}</div><div className="ch-stat-lbl">{t("cards.students")}</div></div>
            <div><div className="ch-stat-val">{center.rating} ★</div><div className="ch-stat-lbl">{t("instructors.rating")}</div></div>
          </div>
        </div>
      </div>

      <section style={{ marginBottom: "2rem" }}>
        <div className="dash-section-title">{t("centerProfile.coursesBy")} {center.name}</div>
        <div className="courses-grid">
          {centerCourses.length > 0
            ? centerCourses.map((c) => <CourseCard key={c.id} course={c} setPage={setPage} t={t} />)
            : <p style={{ color: "var(--text2)" }}>{t("centerProfile.noCourses")}</p>}
        </div>
      </section>

      <section>
        <div className="dash-section-title">{t("centerProfile.instructorsAt")} {center.name}</div>
        <div className="instructors-grid">
          {centerInstructors.map((i) => (
            <div key={i.id} className="instructor-card">
              <div className="instructor-header">
                <div className="avatar">{i.avatar}</div>
                <div>
                  <div className="instructor-name">{i.name}</div>
                  <div className="instructor-title">{i.title}</div>
                </div>
              </div>
              <div className="instructor-bio">{i.bio}</div>
              <div className="specialties">{i.specialties.map((s) => <span key={s} className="tag">{s}</span>)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
