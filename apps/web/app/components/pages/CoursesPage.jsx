import { useState } from "react";
import Footer from "../layout/Footer";
import CourseCard from "../cards/CourseCard";

export default function CoursesPage({ setPage, courses, t }) {
  const categories = [
    { value: "All", label: t("courses.all") },
    { value: "Data Science", label: t("courses.dataScience") },
    { value: "Programming", label: t("courses.programming") },
    { value: "Computer Science", label: t("courses.computerScience") },
    { value: "Design", label: t("courses.design") },
  ];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? courses : courses.filter((c) => c.category === active);

  return (
    <>
      <div style={{ paddingTop: 100 }}>
        <section className="section">
          <div className="section-header">
            <div className="section-tag">{t("courses.tag")}</div>
            <h2 className="section-title">{t("courses.title")}</h2>
            <p className="section-sub">{t("courses.subtitle")}</p>
          </div>
          <div className="filters">
            {categories.map((c) => (
              <button key={c.value} className={`filter-btn ${active === c.value ? "active" : ""}`} onClick={() => setActive(c.value)}>{c.label}</button>
            ))}
          </div>
          <div className="courses-grid">
            {filtered.map((c) => <CourseCard key={c.id} course={c} setPage={setPage} t={t} />)}
          </div>
        </section>
      </div>
      <Footer setPage={setPage} t={t} />
    </>
  );
}
