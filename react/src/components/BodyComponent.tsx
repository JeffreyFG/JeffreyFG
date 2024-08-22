import Container from "react-bootstrap/esm/Container";
import Header from "./myHeader";
import "../styles/global.scss";
import myFooter from "./myFooter";
export default function BodyComponent({ children }: { children: any }) {
  return (
    <div className="mainBackGround ">
      <Header></Header>
      <Container className="mainContainer">{children}</Container>
    </div>
  );
}
