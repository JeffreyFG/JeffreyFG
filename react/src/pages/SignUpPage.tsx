// Signup.jsx
import useFetch from "../hooks/useFetch";
import BodyComponent from "../components/BodyComponent";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import useSignUp from "../hooks/useSignUp";
import Image from "react-bootstrap/Image";
import { Dispatch, SetStateAction } from "react";
import userInterface from "../interfaces/userInterface";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUpPage = (properties: { isLoggedIn: boolean; setStateUser: Dispatch<SetStateAction<userInterface>> }) => {
  const { error, loading, handleGoogle } = useFetch("https://JeffreyFG.net/api/auth/login", properties.setStateUser);
  const { isSignUpPermitted, getPermissionToSignUp } = useSignUp();
  getPermissionToSignUp();

  return (
    <BodyComponent isloggedIn={properties.isLoggedIn} setStateUser={properties.setStateUser}>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
                    {
                      error && <p style={{ color: "red" }}>{error}</p>;
                    }
                  }}
                />
              </>
            ) : (
              <>
                <p>Sign ups are not permitted anymore</p>
                <br />
                <p>The sign up functionality is no longer permitted as it was created to show that I understand how to create a complete auth flow</p>
                <br></br>
                <p> In an effort to demonstrate this further I have created a full diagram for this web application</p>
                <Image fluid src="/images/JeffreyFGServerStructure.drawio.svg" rounded />
              </>
            )}
          </>
        )}
      </main>
    </BodyComponent>
  );
};

export default SignUpPage;
