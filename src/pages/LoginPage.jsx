import { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthPages.css";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

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

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="auth-btn">Sign In</button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
