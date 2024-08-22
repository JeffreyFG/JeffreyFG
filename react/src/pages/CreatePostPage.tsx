import BodyComponent from "../components/BodyComponent.tsx";
import userType from "../types/userType.ts";
import CreatePostForm from "../components/CreatePostPage/CreatePostForm.tsx";

export default function CreatePostPage(user: userType) {
  return (
    <BodyComponent>
      <div className="container mt-8 mb-8">
        <p>Welcome {user.firstName}</p>
        <br></br>
        <CreatePostForm {...user} />
      </div>
    </BodyComponent>
  );
}
