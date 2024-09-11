//import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import BodyComponent from "../components/BodyComponent";

import { Dispatch, SetStateAction } from "react";
import userInterface from "../interfaces/userInterface";
import { useNavigate } from "react-router-dom";

// https://developers.google.com/identity/gsi/web/reference/js-reference

export default function LoginPage(properties: { isLoggedIn: boolean; setStateUser: Dispatch<SetStateAction<userInterface>> }) {
  const { handleGoogle, loading, error } = useFetch("https://JeffreyFG.net/api/auth/login", properties.setStateUser);
  const navigate = useNavigate();
  return (
    <BodyComponent isloggedIn={properties.isLoggedIn} setStateUser={properties.setStateUser}>
      <p className="text-center">My website used Google's open authentication standard in conjunction with my own authorization process</p>
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
          />
        </main>
      )}
      {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
    </BodyComponent>
  );
}
