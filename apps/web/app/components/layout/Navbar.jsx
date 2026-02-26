export default function Navbar({ activePage, setPage, scrolled, user, onLogout, t, onToggleLocale }) {
  const L = (key, fallback) => (typeof t === "function" ? t(key) : fallback);
  const initials = user ? user.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() : "";
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => setPage("home")}>Masar</div>
      <ul className="nav-links">
        {["home", "courses", "instructors", "centers"].map(p => (
          <li key={p}>
            <a className={activePage === p ? "active" : ""} onClick={() => setPage(p)}>
              {L(`nav.${p}`, p.charAt(0).toUpperCase() + p.slice(1))}
            </a>
          </li>
        ))}
        {user && <li><a className={activePage === "dashboard" || activePage === "inst-dashboard" || activePage === "center-dashboard" ? "active" : ""} onClick={() => setPage(user.role === "instructor" ? "inst-dashboard" : user.role === "center" ? "center-dashboard" : "dashboard")}>{L("nav.mySpace", "My Space")}</a></li>}
      </ul>
      <div className="nav-actions">
        <button className="btn btn-ghost" onClick={onToggleLocale}>{L("nav.lang", "العربية")}</button>
        {user ? (
          <>
            <div className="nav-user" onClick={() => setPage(user?.role === "instructor" ? "inst-dashboard" : user?.role === "center" ? "center-dashboard" : "dashboard")}>
              <div className="nav-avatar">{initials}</div>
              <span className="nav-username">{user.name.split(" ")[0]}</span>
            </div>
            <button className="btn btn-ghost" onClick={onLogout}>{L("nav.signOut", "Sign Out")}</button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={() => setPage("login")}>{L("nav.signIn", "Sign In")}</button>
            <button className="btn btn-primary" onClick={() => setPage("register")}>{L("nav.joinFree", "Join Free")}</button>
          </>
        )}
      </div>
    </nav>
  );
}
