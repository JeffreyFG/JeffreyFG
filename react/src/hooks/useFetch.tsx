import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import userInterface from "../interfaces/userInterface";
const useFetch = (url: string | URL | Request) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const initialValue: userInterface = {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    token: "",
  };
  const [setUser] = useLocalStorage<userInterface>("user", initialValue);
  const handleGoogle = async (credentialResponse: CredentialResponse) => {
    console.log("handle google called");
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: credentialResponse.credential }),
    })
      .then((res) => {
        setLoading(false);

        return res.json();
      })
      .then((data) => {
        console.log("this is the user data returned from the server" + data);
        if (data?.user) {
          let user: userInterface = data?.user;
          setUser(user);
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setUser(initialValue);
        setError(error?.message);
      });
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
