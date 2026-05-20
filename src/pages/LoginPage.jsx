import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPages.css";

const API = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [loginMethod, setLoginMethod] = useState("email");

  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function formatPhoneForBackend(phone) {
    const cleaned = phone.replace(/\s+/g, "").replace(/-/g, "");

    if (cleaned.startsWith("0")) return cleaned;
    if (cleaned.startsWith("7")) return `0${cleaned}`;
    if (cleaned.startsWith("+962")) return `0${cleaned.slice(4)}`;

    return cleaned;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload =
        loginMethod === "email"
          ? {
              email: form.email,
              password: form.password,
            }
          : {
              phone: formatPhoneForBackend(form.phone),
              password: form.password,
            };

      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🎬 CineRate</div>

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Sign in to your account</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="method-tabs">
          <button
            type="button"
            className={loginMethod === "email" ? "active-tab" : ""}
            onClick={() => setLoginMethod("email")}
          >
            via EMAIL
          </button>

          <button
            type="button"
            className={loginMethod === "phone" ? "active-tab" : ""}
            onClick={() => setLoginMethod("phone")}
          >
            via PHONE
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div key={loginMethod} className="form-transition">
            {loginMethod === "email" ? (
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            ) : (
              <div className="form-group">
                <label>Phone Number</label>
                <div className="phone-row">
                  <span className="country-code">🇯🇴 +962</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="7X XXX XXXX"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="button"
            className="switch-method"
            onClick={() =>
              setLoginMethod(loginMethod === "email" ? "phone" : "email")
            }
          >
            {loginMethod === "email"
              ? "USE PHONE INSTEAD"
              : "USE EMAIL INSTEAD"}
          </button>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="forgot-password">Forgot password?</p>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;