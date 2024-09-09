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
    data?: {
      user: userInterface;
    };
    errors?: Array<{ message: string }>;
  };

  const handleGoogle = async (credentialResponse: CredentialResponse) => {
    console.log("handle google called");
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: credentialResponse.credential }),
    });
    const { data, errors }: JSONResponse = await response.json();
    if (response.ok) {
      setLoading(false);
      const userResponse: userInterface = data?.user!;
      if (userResponse) {
        setUser(userResponse);
      } else {
        return Promise.reject(new Error(`No user response}"`));
      }
      setError("No user in response");
      throw new Error("No user in response");
    } else {
      // handle the graphql errors

      const error = new Error(errors?.map((e) => e.message).join("\n") ?? "unknown");
      return Promise.reject(error);
    }
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
