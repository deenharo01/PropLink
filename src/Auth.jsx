import { useState } from "react";
import { supabase } from "./supabaseClient";

function Auth({ onClose }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Account created. Check your email if confirmation is required."
        );
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Signed in successfully.");
        onClose?.();
      }
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="listing-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <span className="section-label">
          PROPLINK ACCOUNT
        </span>

        <h2>
          {mode === "login"
            ? "Welcome back"
            : "Create your account"}
        </h2>

        <p>
          {mode === "login"
            ? "Sign in to manage your properties and connect with owners."
            : "Create an account to list properties and connect with people."}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            minLength={6}
            required
          />

          {message && (
            <p
              style={{
                color: "#7da9ff",
                marginBottom: "15px",
              }}
            >
              {message}
            </p>
          )}

          <button
            className="primary-button full"
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

        <button
          type="button"
          onClick={() =>
            setMode(
              mode === "login"
                ? "signup"
                : "login"
            )
          }
          style={{
            width: "100%",
            marginTop: "15px",
            border: "none",
            background: "transparent",
            color: "#5794ff",
            fontSize: "13px",
          }}
        >
          {mode === "login"
            ? "Don't have an account? Create one"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
