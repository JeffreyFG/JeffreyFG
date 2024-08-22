// Signup.jsx
import useFetch from "../hooks/useFetch";
import BodyComponent from "../components/BodyComponent";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUpPage = function () {
  const { error, loading, handleGoogle } = useFetch(
    "https://JeffreyFG.net/api/auth/login"
  );
  <GoogleLogin
    onSuccess={(credentialResponse: CredentialResponse) => {
      handleGoogle(credentialResponse);
    }}
    onError={() => {
      console.log("Login Failed:  ", error);
    }}
  />;
  return (
    <BodyComponent>
      <p style={{ textAlign: "center" }}>
        <h1>Register to continue</h1>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div id="signUpDiv" data-text="signup_with"></div>
      )}
    </BodyComponent>
  );
};

export default SignUpPage;
