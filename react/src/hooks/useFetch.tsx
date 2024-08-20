import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
const useFetch = (url: string | URL | Request) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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
        console.log("this is the userdata retured from the server" + data);
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          window.location.reload();
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
