import { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthPages.css";

function LoginPage() {
  const [loginMethod, setLoginMethod] = useState("email");

  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Login is not functional yet — coming soon!");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🎬 CineRate</div>

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Sign in to your account</p>

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

          <button type="submit" className="auth-btn">
            Sign In
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