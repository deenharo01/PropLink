import { useEffect, useState } from "react";
import Auth from "./Auth";
import { supabase } from "./supabaseClient";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    const checkUser = async () => {
      try {
        if (!supabase) {
          console.log("Supabase client is not configured.");
          setLoading(false);
          return;
        }
        const {
          data,
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.log("Supabase auth error:", error.message);
        }
        if (mounted) {
          setUser(data?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };
    checkUser();
    if (!supabase) {
      return () => {
        mounted = false;
      };
    }
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      }
    );
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050505",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          fontSize: "20px",
        }}
      >
        Loading PropLink...
      </div>
    );
  }
  if (!user) {
    return <Auth />;
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#ffffff",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
        Prop<span style={{ color: "#00d084" }}>Link</span>
      </h1>
      <p style={{ color: "#aaa" }}>
        Authentication successful.
      </p>
      <p style={{ color: "#777", marginTop: "20px" }}>
        Logged in as: {user.email}
      </p>
      <button
        onClick={async () => {
          await supabase?.auth.signOut();
        }}
        style={{
          marginTop: "30px",
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
export default App;
