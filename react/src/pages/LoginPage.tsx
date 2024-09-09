//import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import BodyComponent from "../components/BodyComponent";
import { useNavigate } from "react-router-dom";
// https://developers.google.com/identity/gsi/web/reference/js-reference

export default function LoginPage() {
  const { handleGoogle, loading, error } = useFetch("https://JeffreyFG.net/api/auth/login");
  const navigate = useNavigate();
  return (
    <BodyComponent>
      <p className="text-center">My website used Google's open auth standard in conjunction with my own authorization process</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <div>Loading....</div>
      ) : (
        <main
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <GoogleLogin
            onSuccess={(credentialResponse: CredentialResponse) => {
              handleGoogle(credentialResponse);
              navigate("/CreatePostPage");
            }}
            onError={() => {
              console.log("Login Failed:  ", error);
              {
                error && <p style={{ color: "red" }}>{error}</p>;
              }
            }}
            useOneTap
          />
        </main>
      )}
      {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
    </BodyComponent>
  );
}
