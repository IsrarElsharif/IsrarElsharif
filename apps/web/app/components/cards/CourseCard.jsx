import StarRating from "../shared/StarRating";

export default function CourseCard({ course, setPage, t }) {
  const L = (key, fallback) => (typeof t === "function" ? t(key) : fallback);
  return (
    <div className="course-card" onClick={() => setPage && setPage("course-" + course.id)} style={{ cursor: setPage ? "pointer" : "default" }}>
      <div className="course-cover">
        <span className="float">{course.image}</span>
        <span className="course-level">{course.level}</span>
      </div>
      <div className="course-body">
        <div className="course-meta">
          <span className="course-center">{course.center || L("cards.independentInstructor", "Independent Instructor")}</span>
        </div>
        <div className="course-title">{course.title}</div>
        <div className="course-instructor">{L("cards.by", "by")} {course.instructor} · {course.duration}</div>
        <div className="course-tags">
          {course.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="course-footer">
          <span className="course-price">${course.price}</span>
          <div>
            <div className="course-rating">
              <StarRating rating={course.rating} />
              <span>{course.rating}</span>
            </div>
            <div className="course-students">{course.students} {L("cards.students", "students")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
