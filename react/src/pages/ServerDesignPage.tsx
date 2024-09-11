import BodyComponent from "../components/BodyComponent.tsx";
import Image from "react-bootstrap/Image";
import { Dispatch, SetStateAction } from "react";
import userInterface from "../interfaces/userInterface.ts";
import Container from "react-bootstrap/esm/Container";
const ServerDesignPage = (properties: { isLoggedIn: boolean; setStateUser: Dispatch<SetStateAction<userInterface>> }) => {
  return (
    <BodyComponent isloggedIn={properties.isLoggedIn} setStateUser={properties.setStateUser}>
      <Container fluid>
        <div style={{ textAlign: "justify", padding: "2rem", font: "serif", fontSize: "20px" }}>
          <h1>Sever design diagram</h1>

          <p> This a detailed diagram to show my design for this Web application server. I created the diagram using draw.io.</p>
          <Image fluid src="/images/JeffreyFGServerStructure.drawio.svg" rounded />
        </div>
      </Container>
    </BodyComponent>
  );
};
export default ServerDesignPage;
