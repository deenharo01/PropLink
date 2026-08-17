import { useState } from "react";
import { supabase, supabaseConfigured } from "./supabaseClient";

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

    setMessage("");
    setMessageType("");

    if (!supabaseConfigured || !supabase) {
      setMessage(
        "PropLink authentication is not connected yet. Please configure Supabase."
      );
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
        const { error } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (error) {
          setMessage(error.message);
          setMessageType("error");
          return;
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
      current === "login" ? "signup" : "login"
    );

    setMessage("");
    setMessageType("");
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
            FIND YOUR PLACE
          </div>

          <h1>
            Property
            <br />
            <span>without the hassle.</span>
          </h1>

          <p>
            Discover homes, apartments, rooms and
            commercial spaces across Zimbabwe.
            Connect directly with the people behind
            the property.
          </p>

          <div className="auth-points">
            <div>
              <span>01</span>
              <p>Search properties</p>
            </div>

            <div>
              <span>02</span>
              <p>Compare your options</p>
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
              PROPLINK ACCOUNT
            </div>

            <h2>
              {mode === "login"
                ? "Welcome back."
                : "Create your account."}
            </h2>

            <p>
              {mode === "login"
                ? "Sign in to continue exploring properties."
                : "Join PropLink and start finding your next place."}
            </p>
          </div>

          {!supabaseConfigured && (
            <div className="auth-warning">
              Authentication is not configured for this
              deployment yet.
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {mode === "signup" && (
              <div className="auth-field">
                <label>Full name</label>

                <input
                  type="text"
                  placeholder="Your full name"
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
                placeholder="Minimum 6 characters"
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
                  ? "Sign in"
                  : "Create account"}
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
        <span>© 2026</span>
      </footer>
    </div>
  );
}

export default Auth;
