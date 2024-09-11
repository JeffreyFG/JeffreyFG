import Container from "react-bootstrap/esm/Container";
import Header from "../components/myHeader";
import NavBarComponent from "./NavBar/NavBarComponent";
import { Dispatch, SetStateAction } from "react";
import userInterface from "../interfaces/userInterface";
export default function BodyComponent(properties: {
  isloggedIn: boolean;
  setStateUser: Dispatch<SetStateAction<userInterface>>;
  children: any;
}) {
  return (
    <>
      <Header children={undefined}></Header>
      <div className="mainBackGround ">
        <NavBarComponent
          isLoggedIn={properties.isloggedIn}
          setStateUser={properties.setStateUser}
        />
        <Container className="mainContainer">{properties.children}</Container>
      </div>
    </>
  );
}
