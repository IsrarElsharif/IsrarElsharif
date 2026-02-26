import Footer from "../layout/Footer";

export default function InstructorsPage({ setPage, instructors, t }) {
  return (
    <>
      <div style={{ paddingTop: 100 }}>
        <section className="section">
          <div className="section-header">
            <div className="section-tag">{t("instructors.tag")}</div>
            <h2 className="section-title">{t("instructors.title")}</h2>
            <p className="section-sub">{t("instructors.subtitle")}</p>
          </div>
          <div className="instructors-grid">
            {instructors.map((i) => (
              <div key={i.id} className="instructor-card" onClick={() => setPage("instructor-" + i.id)}>
                <div className="instructor-header">
                  <div className="avatar">{i.avatar}</div>
                  <div>
                    <div className="instructor-name">{i.name}</div>
                    <div className="instructor-title">{i.title}</div>
                    <div className="instructor-center">{i.center || t("instructors.independent")}</div>
                  </div>
                </div>
                <div className="instructor-bio">{i.bio}</div>
                <div className="specialties">
                  {i.specialties.map((s) => <span key={s} className="tag">{s}</span>)}
                </div>
                <div className="instructor-stats">
                  <div className="i-stat"><div className="i-stat-val">{i.courses}</div><div className="i-stat-lbl">{t("instructors.courses")}</div></div>
                  <div className="i-stat"><div className="i-stat-val">{i.students}</div><div className="i-stat-lbl">{t("instructors.students")}</div></div>
                  <div className="i-stat"><div className="i-stat-val">{i.rating}</div><div className="i-stat-lbl">{t("instructors.rating")}</div></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer setPage={setPage} t={t} />
    </>
  );
}
