import Form from "react-bootstrap/esm/Form";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Button from "react-bootstrap/esm/Button";
import { Jwt } from "jsonwebtoken";

interface FormElements extends HTMLFormControlsCollection {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  fileInput: HTMLInputElement;
  token: HTMLInputElement;
}
interface postFormElement extends HTMLFormElement {
  // now we can override the elements type to be an HTMLFormControlsCollection
  // of our own design...
  readonly elements: FormElements;
}

export default function CreatePostForm({ onSubmitForm }: { onSubmitForm: (title: string, description: string, file: File, token: string) => void }) {
  function handleSubmit(event: React.FormEvent<postFormElement>) {
    event.preventDefault();

    const titleValue: string = event.currentTarget.elements.titleInput.value;
    const descriptionValue: string = event.currentTarget.elements.descriptionInput.value;
    const fileValue: File = event.currentTarget.files[0];
    onSubmitForm(titleValue, descriptionValue, fileValue, token!);
  }
  const initialValue = "";
  const [token] = useLocalStorage<string>("token", initialValue);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control id="titleInput" type="text" placeholder="Tile of blog post" name="titleValue" />
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description for Blog Post</Form.Label>
        <Form.Control id="descriptionInput" as="textarea" rows={3} name="descriptionValue" />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Picture for Blog Post</Form.Label>
        <Form.Control type="file" name="pictureValue" accept="image/*" />
      </Form.Group>
      <Button id="fileInput" as="input" type="submit" value="Submit" />{" "}
    </Form>
  );
}
