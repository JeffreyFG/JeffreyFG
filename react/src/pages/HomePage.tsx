import BodyComponent from "../components/BodyComponent.tsx";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Dispatch, SetStateAction } from "react";
import userInterface from "../interfaces/userInterface.ts";
const Home = (properties: {
  isLoggedIn: boolean;
  setStateUser: Dispatch<SetStateAction<userInterface>>;
}) => {
  return (
    <BodyComponent
      isloggedIn={properties.isLoggedIn}
      setStateUser={properties.setStateUser}
    >
      <Row>
        <Col xs={12} sm={12} md={4} lg={4} xl={5}>
          <Image src="/images/profilePicture.jpeg" rounded />
        </Col>

        <Col xs={12} sm={12} md={8} lg={8} xl={7}>
          <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
            <h3 className="display-5">Jeffrey Fulmer Gardner</h3>
          </div>
          <div className="p-3 bg-black text-white">
            <p>
              Hello thank you for coming to my website. My name is JeffreyFG, I
              am the owner of Mosaic Web Design, a new company for which I have
              just started. I design and develop websites for small business and
              clients. This website serves as a expanded portfolio for my skills
              as a full stack developer, and as a gallery for potential clients
              to see my previous works. If you have any questions are would like
              to set up a meeting to discuss a potential website please contact
              me at JeffreyFG@Outlook.com
            </p>
          </div>
        </Col>
      </Row>
    </BodyComponent>
  );
};
export default Home;
