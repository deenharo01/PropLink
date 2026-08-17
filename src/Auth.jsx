import { useState } from "react";
import { supabase, supabaseConfigured } from "./supabaseClient";
function Auth() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("");
    if (!supabaseConfigured || !supabase) {
      setMessage(
        "Authentication is not connected. Check your Supabase environment variables."
      );
      setMessageType("error");
      return;
    }
    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      setMessageType("error");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setMessageType("error");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setMessage("Please enter your full name.");
      setMessageType("error");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
            },
          },
        });
        if (error) {
          setMessage(error.message);
          setMessageType("error");
          return;
        }
        if (data?.user && !data?.session) {
          setMessage(
            "Account created. Check your email to confirm your account."
          );
        } else {
          setMessage("Account created successfully.");
        }
        setMessageType("success");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) {
          setMessage(error.message);
          setMessageType("error");
          return;
        }
        setMessage("Signed in successfully.");
        setMessageType("success");
      }
    } catch (error) {
      setMessage(
        error?.message || "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };
  const switchMode = () => {
    setMode((current) =>
      current === "login" ? "signup" : "login"
    );
    setMessage("");
    setMessageType("");
    setPassword("");
  };
  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />
      <header className="auth-topbar">
        <div className="auth-logo">
          Prop<span>Link</span>
        </div>
        <div className="auth-location">
          Zimbabwe's property marketplace
        </div>
      </header>
      <main className="auth-layout">
        <section className="auth-intro">
          <div className="auth-kicker">
            ZIMBABWE PROPERTY MARKETPLACE
          </div>
          <h1>
            Find your next
            <br />
            <span>place.</span>
          </h1>
          <p>
            Discover homes, apartments, rooms and
            properties across Zimbabwe. Find what fits
            your life and connect directly with the people
            behind the listing.
          </p>
          <div className="auth-points">
            <div>
              <span>01</span>
              <p>Discover properties</p>
            </div>
            <div>
              <span>02</span>
              <p>Compare options</p>
            </div>
            <div>
              <span>03</span>
              <p>Connect directly</p>
            </div>
          </div>
        </section>
        <section className="auth-card">
          <div className="auth-card-header">
            <div className="auth-mini-label">
              {mode === "login"
                ? "PROPLINK ACCOUNT"
                : "CREATE ACCOUNT"}
            </div>
            <h2>
              {mode === "login"
                ? "Welcome back."
                : "Join PropLink."}
            </h2>
            <p>
              {mode === "login"
                ? "Sign in to continue to the marketplace."
                : "Create your account and start exploring."}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >
            {mode === "signup" && (
              <div className="auth-field">
                <label htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  autoComplete="name"
                  required
                />
              </div>
            )}
            <div className="auth-field">
              <label htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete={
                  mode === "login"
                    ? "current-password"
                    : "new-password"
                }
                minLength={6}
                required
              />
            </div>
            {message && (
              <div
                className={`auth-message ${messageType}`}
              >
                {message}
              </div>
            )}
            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign in to PropLink"
                  : "Create my account"}
            </button>
          </form>
          <div className="auth-divider">
            <span />
            <small>OR</small>
            <span />
          </div>
          <div className="auth-switch">
            <span>
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={switchMode}
            >
              {mode === "login"
                ? "Create one"
                : "Sign in"}
            </button>
          </div>
        </section>
      </main>
      <footer className="auth-footer">
        <span>PropLink</span>
        <span>Find it. Link up. Move in.</span>
        <span>Zimbabwe • 2026</span>
      </footer>
    </div>
  );
}
export default Auth;
