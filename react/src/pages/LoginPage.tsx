import { useEffect } from "react";
//import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BodyComponent from "../components/BodyComponent";
// https://developers.google.com/identity/gsi/web/reference/js-reference

export default function LoginPage() {
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost/api/auth/login"
  );

  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id:
        "408912486691-t31d61dclvfedml4ahpd11o3i676nou1.apps.googleusercontent.com",
      callback: handleGoogle,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("loginDiv"),
      {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "signin_with",
        shape: "pill",
      }
    );
  }, [handleGoogle]);

  return (
    <BodyComponent>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </main>
    </BodyComponent>
  );
}
