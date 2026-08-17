import { useState } from "react";
import {
  supabase,
  supabaseConfigured,
} from "./supabaseClient";
function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!supabaseConfigured || !supabase) {
      setMessage(
        "Authentication is not connected yet. Supabase needs to be configured for this deployment."
      );
      setMessageType("error");
      return;
    }
    setLoading(true);
    setMessage("");
    setMessageType("");
    try {
      if (mode === "signup") {
        const { data, error } =
          await supabase.auth.signUp({
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
          setMessage(
            "Account created successfully."
          );
          setMessageType("success");
        }
      } else {
        const { error } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });
        if (error) {
          setMessage(error.message);
          setMessageType("error");
        }
      }
    } catch (error) {
      setMessage(
        error?.message ||
          "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };
  const switchMode = () => {
    setMode((current) =>
      current === "login"
        ? "signup"
        : "login"
    );
    setMessage("");
    setMessageType("");
  };
  return (
    <div className="auth-page">
      <div className="auth-background"></div>
      <div className="auth-container">
        <div className="auth-brand">
          Prop<span>Link</span>
        </div>
        <div className="auth-card">
          <div className="auth-header">
            <span className="section-label">
              PROPLINK ACCOUNT
            </span>
            <h1>
              {mode === "login"
                ? "Welcome back"
                : "Create your account"}
            </h1>
            <p>
              {mode === "login"
                ? "Sign in to continue to PropLink."
                : "Join PropLink and start connecting with property owners and renters."}
            </p>
          </div>
          {!supabaseConfigured && (
            <div className="auth-message error">
              Supabase is not connected to this
              deployment yet. The PropLink interface
              can still be viewed, but account
              authentication requires Supabase
              configuration.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className="auth-field">
                <label>Full name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
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
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
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
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>
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
        </div>
        <p className="auth-footer">
          Find it. Link up. Move in.
        </p>
      </div>
    </div>
  );
}
export default Auth;
