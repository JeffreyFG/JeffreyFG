import { useState } from "react";
const useFetch = (url: string | URL | Request) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleGoogle = async (response: { credential: any }) => {
    console.log("handle google called");
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);

        return res.json();
      })
      .then((data) => {
        console.log("this is the userdata retured from the server" + data);
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          const user = localStorage.getItem("user");
          console.log(
            "this is the the user data from the local storage" + user
          );
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
