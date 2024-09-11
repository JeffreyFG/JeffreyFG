import { Dispatch, SetStateAction } from "react";
import BodyComponent from "../components/BodyComponent.tsx";
import CreatePostForm from "../components/CreatePostPage/CreatePostForm.tsx";
import userInterface from "../interfaces/userInterface.ts";
import { Navigate } from "react-router-dom";

export default function CreatePostPage(properties: {
  isLoggedIn: boolean;
  user: userInterface | undefined;
  setStateUser: Dispatch<SetStateAction<userInterface>>;
}) {
  return (
    <BodyComponent
      isloggedIn={properties.isLoggedIn}
      setStateUser={properties.setStateUser}
    >
      <div className="container mt-8 mb-8">
        {properties.user ? (
          <>
            <p>Welcome {properties.user.firstName}</p>
            <br></br>
            <CreatePostForm user={properties.user} />
          </>
        ) : (
          <>
            <Navigate to="/login" replace={true} />
            <p>Welcome unknown user </p>
            <br />
            <p>no Form for you</p>
          </>
        )}
      </div>
    </BodyComponent>
  );
}
