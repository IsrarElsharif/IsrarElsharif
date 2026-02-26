import StarRating from "../shared/StarRating";

export default function CenterCard({ center, setPage, t }) {
  const L = (key, fallback) => (typeof t === "function" ? t(key) : fallback);
  return (
    <div className="center-card" onClick={() => setPage("center-" + center.slug)}>
      <div className="center-header">
        <div className="center-glow" style={{ background: center.color }} />
        <div className="center-logo" style={{ background: center.color }}>{center.logo}</div>
        <div className="center-name">{center.name}</div>
        <div className="center-tagline">{center.tagline}</div>
      </div>
      <div className="center-body">
        <div className="center-stats">
          <div className="c-stat"><div className="c-stat-val">{center.courses}</div><div className="c-stat-lbl">{L("cards.courses", "Courses")}</div></div>
          <div className="c-stat"><div className="c-stat-val">{center.instructors}</div><div className="c-stat-lbl">{L("cards.instructors", "Instructors")}</div></div>
          <div className="c-stat"><div className="c-stat-val">{center.students.toLocaleString()}</div><div className="c-stat-lbl">{L("cards.students", "Students")}</div></div>
        </div>
        <div className="center-specs">
          {center.specialties.map((s) => <span key={s} className="spec-tag">{s}</span>)}
        </div>
        <div className="center-meta">
          <span className="center-location">📍 {center.location} · {L("cards.est", "Est.")} {center.founded}</span>
          <div className="center-rating"><StarRating rating={center.rating} /> {center.rating}</div>
        </div>
      </div>
    </div>
  );
}
