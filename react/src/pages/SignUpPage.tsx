// Signup.jsx
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import BodyComponent from "../components/BodyComponent";


// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUpPage = function () {
  const { error, loading, handleGoogle } = useFetch(
    "http://localhost/api/auth/signup"
  );

  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id:
        "408912486691-t31d61dclvfedml4ahpd11o3i676nou1.apps.googleusercontent.com",
      callback: handleGoogle,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signUpDiv"),
      {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      }
    );
  }, [handleGoogle]);

  return (
    <BodyComponent>
      <p style={{ textAlign: "center" }}>
        <h1>Register to continue</h1>
      </p>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}
      </main>
    </BodyComponent>
  );
};

export default SignUpPage;
