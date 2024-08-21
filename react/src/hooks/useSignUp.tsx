import { useState } from "react";
import canSignUpInterface from "../interfaces/canSignUpInterface";

const useSignUp = () => {
  const [isSignUpPermitted, setisSignUpPermitted] = useState<boolean>(false);
  const getPermissionToSignUp = () => {
    const urlForFetch: string = "https://JeffreyFG.net/api/auth/login";
    fetch(urlForFetch, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((response) => {
      response.json().then((response: canSignUpInterface) => {
        setisSignUpPermitted(response.canSignUp);
      });
    });
  };
  return { getPermissionToSignUp, isSignUpPermitted };
};

export default useSignUp;
