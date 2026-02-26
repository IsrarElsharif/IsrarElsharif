export default function Footer({ setPage, t }) {
  const L = (key, fallback) => (typeof t === "function" ? t(key) : fallback);
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">Masar</div>
          <div className="footer-desc">{L("footer.desc", "Sudan's premier platform for tech education — connecting learners with the best training centers and instructors nationwide.")}</div>
        </div>
        <div>
          <div className="footer-heading">{L("footer.platform", "Platform")}</div>
          <ul className="footer-links">
            <li><a onClick={() => setPage("courses")}>{L("nav.courses", "Courses")}</a></li>
            <li><a onClick={() => setPage("instructors")}>{L("nav.instructors", "Instructors")}</a></li>
            <li><a onClick={() => setPage("centers")}>{L("nav.centers", "Centers")}</a></li>
            <li><a onClick={() => setPage("about")}>{L("footer.about", "About")}</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">{L("footer.forEducators", "For Educators")}</div>
          <ul className="footer-links">
            <li><a style={{cursor:"pointer"}} onClick={()=>setPage("register")}>{L("footer.teach", "Teach on Masar")}</a></li>
            <li><a style={{cursor:"pointer"}} onClick={()=>setPage("register")}>{L("footer.listCenter", "List Your Center")}</a></li>
            <li><a style={{cursor:"pointer"}} onClick={()=>setPage("center-dashboard")}>{L("footer.centerDash", "Center Dashboard")}</a></li>
            <li><a style={{cursor:"pointer"}} onClick={()=>setPage("inst-dashboard")}>{L("footer.instructorDash", "Instructor Dashboard")}</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">{L("footer.fields", "Fields")}</div>
          <ul className="footer-links">
            <li><a style={{cursor:"pointer"}} onClick={()=>setPage("courses")}>{L("footer.dataScience", "Data Science")}</a></li>
            <li><a style={{cursor:"pointer"}} onClick={()=>setPage("courses")}>{L("footer.programming", "Programming")}</a></li>
            <li><a style={{cursor:"pointer"}} onClick={()=>setPage("courses")}>{L("footer.computerScience", "Computer Science")}</a></li>
            <li><a style={{cursor:"pointer"}} onClick={()=>setPage("courses")}>{L("footer.uiux", "UI/UX Design")}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2024 Masar. {L("footer.rights", "All rights reserved.")}</div>
        <div className="footer-made">{L("footer.builtForSudan", "Built for Sudan")} 🇸🇩</div>
      </div>
    </footer>
  );
}
