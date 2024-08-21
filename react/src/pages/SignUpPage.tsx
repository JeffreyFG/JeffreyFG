// Signup.jsx
import useFetch from "../hooks/useFetch";
import BodyComponent from "../components/BodyComponent";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import useSignUp from "../hooks/useSignUp";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUpPage = function () {
  const { error, loading, handleGoogle } = useFetch(
    "https://JeffreyFG.net/api/auth/login"
  );
  const { isSignUpPermitted, getPermissionToSignUp } = useSignUp();
  getPermissionToSignUp();
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
          <>
            {isSignUpPermitted ? (
              <>
                <p style={{ textAlign: "center" }}>Register to continue</p>
                <GoogleLogin
                  onSuccess={(credentialResponse: CredentialResponse) => {
                    handleGoogle(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed:  ", error);
                  }}
                  useOneTap
                />
              </>
            ) : (
              <p>Sign ups are not permitted anymore</p>
            )}
          </>
        )}
      </main>
    </BodyComponent>
  );
};

export default SignUpPage;
