import Container from "react-bootstrap/esm/Container";
import Header from "@/app/components/myHeader";
import NavBarComponent from "@/app/components/NavBar/NavBarComponent";
import { Dispatch, SetStateAction } from "react";
import userInterface from "../interfaces/userInterface";
export default function BodyComponent(properties: { isloggedIn: boolean; setStateUser: Dispatch<SetStateAction<userInterface>>; children: any }) {
  return (
    <>
      <Header children={undefined}></Header>
      <div className="mainBackGround ">
        <NavBarComponent isLoggedIn={properties.isloggedIn} />
        <Container className="justify-center">{properties.children}</Container>
      </div>
    </>
  );
}
