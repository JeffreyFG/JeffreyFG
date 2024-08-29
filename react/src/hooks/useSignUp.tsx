import { useState } from "react";
import canSignUpInterface from "../interfaces/canSignUpInterface";

const useSignUp = () => {
  const [isSignUpPermitted, setIsSignUpPermitted] = useState<boolean>(false);
  const getPermissionToSignUp = () => {
    const urlForFetch: string = "https://JeffreyFG.net/api/auth/canSignUp";
    fetch(urlForFetch, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((response) => {
      response.json().then((response: canSignUpInterface) => {
        setIsSignUpPermitted(response.canSignUp);
      });
    });
  };
  return { getPermissionToSignUp, isSignUpPermitted };
};

export default useSignUp;
