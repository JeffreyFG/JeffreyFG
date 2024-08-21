import Form from "react-bootstrap/esm/Form";
//import { useLocalStorage } from "../hooks/useLocalStorage";
import Button from "react-bootstrap/esm/Button";
import userType from "../../types/userType";
import axios from "axios";
import { useState } from "react";
//import { FormEvent } from "react";

interface FormElements extends HTMLFormControlsCollection {
  titleValue: HTMLInputElement;
  descriptionValue: HTMLInputElement;
  files: HTMLInputElement;
}
interface PostFormElement extends HTMLFormElement {
  readonly elements: FormElements;
  readonly files: FileList;
}

export default function CreatePostForm(user: userType) {
  const [currentImage, setCurrentImage] = useState<FileList>();

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: FileList = event.target.files!;
    setCurrentImage(selectedFiles);
  };

  const submitForm = (event: React.FormEvent<PostFormElement>) => {
    event.preventDefault();
    console.log("contents of event from submitForm():   ", event);
    const url = "/api/blog/createPostAction";
    let formData: FormData = new FormData();
    formData.append(
      "titleValue",
      event.currentTarget.elements.titleValue.value
    );
    formData.append(
      "descriptionValue",
      event.currentTarget.elements.descriptionValue.value
    );
    formData.append("file", currentImage![0]);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "content-type": "multipart/form-data",
      },
    };

    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  };
  //
  return (
    <Form onSubmit={submitForm}>
      <Form.Control
        id="titleInput"
        type="text"
        placeholder="Tile of blog post"
        name="titleValue"
      />
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description for Blog Post</Form.Label>
        <Form.Control
          id="descriptionInput"
          as="textarea"
          rows={3}
          name="descriptionValue"
        />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Picture for Blog Post</Form.Label>
        <Form.Control accept="image/*" type="file" onChange={selectImage} />
      </Form.Group>
      <Button as="input" type="submit" value="Submit" />{" "}
    </Form>
  );
}
