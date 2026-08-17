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
        "PropLink authentication is not connected yet. Add your Supabase environment variables."
      );
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        if (!name.trim()) {
          setMessage("Please enter your full name.");
          setMessageType("error");
          return;
        }

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
          setMessageType("success");
        } else {
          setMessage("Account created successfully.");
          setMessageType("success");
        }
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
    setMode(mode === "login" ? "signup" : "login");
    setMessage("");
    setMessageType("");
    setPassword("");
  };

  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-logo-mark">P</div>

          <div>
            <div className="auth-brand-name">
              Prop<span>Link</span>
            </div>

            <div className="auth-brand-subtitle">
              Zimbabwe Property Marketplace
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-top">
            <span className="section-label">
              {mode === "login" ? "WELCOME BACK" : "JOIN PROPLINK"}
            </span>

            <h1>
              {mode === "login"
                ? "Find your next place."
                : "Start your property journey."}
            </h1>

            <p>
              {mode === "login"
                ? "Sign in to discover properties and connect directly with owners."
                : "Create an account to find, list and connect through PropLink."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === "signup" && (
              <div className="auth-field">
                <label>Full name</label>

                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            )}

            <div className="auth-field">
              <label>Email address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <div className="password-label-row">
                <label>Password</label>

                {mode === "login" && (
                  <span className="password-hint">
                    Minimum 6 characters
                  </span>
                )}
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                minLength={6}
                required
              />
            </div>

            {message && (
              <div className={`auth-message ${messageType}`}>
                <span>
                  {messageType === "error" ? "!" : "✓"}
                </span>

                <p>{message}</p>
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
            <span>OR</span>
          </div>

          <div className="auth-switch">
            <span>
              {mode === "login"
                ? "Don't have a PropLink account?"
                : "Already have a PropLink account?"}
            </span>

            <button type="button" onClick={switchMode}>
              {mode === "login" ? "Create one" : "Sign in"}
            </button>
          </div>
        </div>

        <div className="auth-trust">
          <span>●</span>
          Direct connections
          <span>•</span>
          Zimbabwe properties
          <span>•</span>
          Built for you
        </div>

        <p className="auth-footer">
          Find it. Link up. Move in.
        </p>
      </div>
    </div>
  );
}

export default Auth;
