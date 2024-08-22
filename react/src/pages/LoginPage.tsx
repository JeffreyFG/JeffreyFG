//import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import BodyComponent from "../components/BodyComponent";
// https://developers.google.com/identity/gsi/web/reference/js-reference

export default function LoginPage() {
  const { handleGoogle, loading, error } = useFetch(
    "https://JeffreyFG.net/api/auth/login"
  );

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
        {loading ? (
          <div>Loading....</div>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse: CredentialResponse) => {
              handleGoogle(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed:  ", error);
            }}
            useOneTap
          />
        )}
      </main>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
    </BodyComponent>
  );
}
