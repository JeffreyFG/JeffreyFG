import Container from "react-bootstrap/esm/Container";
import "../styles/global.scss";
import Header from "../components/myHeader";
import NavBarComponent from "./NavBar/NavBarComponent";
export default function BodyComponent({ children }: { children: any }) {
  return (
    <>
      <Header children={undefined}></Header>
      <div className="mainBackGround ">
        <NavBarComponent />
        <Container className="mainContainer">{children}</Container>
      </div>
    </>
  );
}
