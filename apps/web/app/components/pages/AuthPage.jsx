import { useState } from "react";

export default function AuthPage({ mode, setPage, onLogin, t }) {
  const L = (key, fallback) => (typeof t === "function" ? t(key) : fallback);
  const [role, setRole] = useState("student");
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spec, setSpec] = useState("");
  const [centerName, setCenterName] = useState("");
  const [error, setError] = useState("");

  const roles = [
    { key: "student", label: L("auth.roles.student", "Student"), icon: "🎓" },
    { key: "instructor", label: L("auth.roles.instructor", "Instructor"), icon: "👨‍🏫" },
    { key: "center", label: L("auth.roles.center", "Center"), icon: "🏢" },
    { key: "visitor", label: L("auth.roles.visitor", "Visitor"), icon: "👋" },
  ];

  const handleSubmit = () => {
    if (!email || !password) {
      setError(L("auth.errors.required", "Please fill in all required fields."));
      return;
    }
    if (!isLogin && !name) {
      setError(L("auth.errors.name", "Please enter your name."));
      return;
    }
    setError("");
    const resolvedRole = isLogin ? "student" : role;
    const userData = {
      name: isLogin ? email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : name,
      email,
      role: resolvedRole,
      specialization: spec || L("auth.defaultSpec", "Tech & Programming"),
      centerName: centerName || null,
    };
    onLogin(userData);
    setPage(resolvedRole === "instructor" ? "inst-dashboard" : resolvedRole === "center" ? "center-dashboard" : "dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">Masar</div>
        <div className="auth-title">{isLogin ? L("auth.welcome", "Welcome back") : L("auth.join", "Join Masar")}</div>
        <div className="auth-sub">{isLogin ? L("auth.signinSub", "Sign in to continue your learning journey.") : L("auth.signupSub", "Create your account and start growing today.")}</div>

        {!isLogin && (
          <>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text2)", marginBottom: "0.5rem" }}>{L("auth.iAm", "I am a...")}</div>
            <div className="role-selector">
              {roles.map((r) => (
                <button key={r.key} className={`role-btn ${role === r.key ? "selected" : ""}`} onClick={() => setRole(r.key)}>
                  <span className="role-icon">{r.icon}</span>{r.label}
                </button>
              ))}
            </div>
          </>
        )}

        {!isLogin && (
          <div className="form-group">
            <label className="form-label">{L("auth.fullName", "Full Name")}</label>
            <input className="form-input" type="text" placeholder="Mohammed Abdallah" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">{L("auth.email", "Email Address")}</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        {!isLogin && role === "student" && (
          <div className="form-group">
            <label className="form-label">{L("auth.specialization", "Specialization / Field of Interest")}</label>
            <input className="form-input" type="text" placeholder="e.g. Data Science, Programming..." value={spec} onChange={(e) => setSpec(e.target.value)} />
          </div>
        )}
        {!isLogin && role === "center" && (
          <div className="form-group">
            <label className="form-label">{L("auth.centerName", "Center Name")}</label>
            <input className="form-input" type="text" placeholder="e.g. TechHub Khartoum" value={centerName} onChange={(e) => setCenterName(e.target.value)} />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">{L("auth.password", "Password")}</label>
          <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <div style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "0.75rem", padding: "0.6rem 0.9rem", background: "rgba(248,113,113,0.08)", borderRadius: 8, border: "1px solid rgba(248,113,113,0.2)" }}>{error}</div>}

        <button className="btn btn-primary" style={{ width: "100%", padding: "0.85rem", fontSize: "1rem", borderRadius: 10, marginTop: "0.5rem" }} onClick={handleSubmit}>
          {isLogin ? L("auth.signIn", "Sign In") : L("auth.create", "Create Account")}
        </button>

        <div className="auth-footer">
          {isLogin ? L("auth.noAccount", "Don't have an account?") : L("auth.haveAccount", "Already have an account?")} {" "}
          <span className="auth-link" onClick={() => { setIsLogin(!isLogin); setError(""); }}>{isLogin ? L("auth.signUp", "Sign up") : L("auth.signIn", "Sign in")}</span>
        </div>
      </div>
    </div>
  );
}
