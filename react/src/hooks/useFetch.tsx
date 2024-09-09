import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import userInterface from "../interfaces/userInterface";
const useFetch = (url: string | URL | Request) => {
  const initialValue: userInterface = {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    token: "",
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [_user, setUser] = useLocalStorage<userInterface>("user", initialValue);

  type JSONResponse = {
    message: string;
    user: userInterface;
  };

  const handleGoogle = async (credentialResponse: CredentialResponse) => {
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: credentialResponse.credential }),
    });
    //const { data, errors }: JSONResponse = await response.json();
    const { message, user }: JSONResponse = await response.json();
    if (response.ok) {
      setLoading(false);
      const userResponse: userInterface = user;
      if (userResponse) {
        setUser(userResponse);
        setLoading(false);
        return;
      } else {
        setError("No user in response");
        const error = new Error("No user in response");
        return Promise.reject(error);
      }
    } else {
      const error = new Error(message);
      return Promise.reject(error);
    }
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
