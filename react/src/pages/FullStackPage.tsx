import BodyComponent from "../components/BodyComponent.tsx";
import Image from "react-bootstrap/Image";
import { Dispatch, SetStateAction } from "react";
import userInterface from "../interfaces/userInterface.ts";
import Container from "react-bootstrap/esm/Container";
const FullStackPage = (properties: { isLoggedIn: boolean; setStateUser: Dispatch<SetStateAction<userInterface>> }) => {
  return (
    <BodyComponent isloggedIn={properties.isLoggedIn} setStateUser={properties.setStateUser}>
      <Container fluid>
        <div style={{ textAlign: "justify", padding: "2rem", font: "serif", fontSize: "20px" }}>
          <h1>Full Stack developer</h1>
          <p>
            {" "}
            What does it mean to be a full stack developer? A quick answer might be Backend and Frontend. The truth for me is knowing and able to work
            at every literal level in the stack.
          </p>
          <ol>
            <li>Configure hardware.</li>
            <li>Install Operating System</li>
            <li>Configure Operating System</li>
            <ol type="I">
              <li>Install software packages</li>
              <ol type="i">
                <li>Docker</li>
                <li>Node</li>
              </ol>
              <li>Maintain System</li>
              <ol type="i">
                <li>Install package updates</li>
                <li>Install OS</li>
              </ol>
            </ol>
            <li> Create Services for Docker and docker compose, where each service in turn have there own configurations and customizations</li>
            <ol type="I">
              <li>NGINX</li>
              <ol type="i">
                <li>Write configuration files.</li>
                <li>Enable HTTPS through TLS.</li>
                <li>Serve React webapp.</li>
              </ol>
              <li>MongoDB</li>
              <ol type="i">
                <li>Write configuration files</li>
                <li>Export previous database and restore to new system</li>
                <li>Posts are stored in this database</li>
                <li>Users are stored in this database</li>
              </ol>
              <li>Express Backend</li>
            </ol>
            <li>Write website </li>
            <ol type="I">
              <li>Express backend</li>
              <ol type="i">
                <li>Create posts by interacting with database</li>
                <li>Display posts by interacting with database</li>
                <li>Enable authentication via google oauth.</li>
                <li>Enable authorization for authenticated users</li>
              </ol>
              <li>Create Frontend using react</li>
              <ol type="i">
                <li>Create posts</li>
                <li>Display posts</li>
                <li>Enable authentication via google oauth.</li>
              </ol>
            </ol>
          </ol>
          <p>I have the skills and understanding to work at any level of the software webapp stack.</p>
        </div>
      </Container>
    </BodyComponent>
  );
};
export default FullStackPage;
