import BodyComponent from "../components/BodyComponent.tsx";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
export default function Home() {
  return (
    <BodyComponent>
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
              Hello, thank you for coming to my website, My name is Jeffrey
              Fulmer Gardner. I am a San Francisco Native with a passion for
              software development. I have been developing my software
              development skills for years by first Attending CCSF where I got
              my associates degree in computer Science. I am currently attending
              SFSU in pursuit of a Bachelors in computer science. I wanted to
              create this site so that I could fill that section on job
              applications and have a page of my own to show off my computer
              programing skills. This site is built on express and Nodejs is
              hosted by me. From hardware configuration to final website, I have
              created this with my own skills. I will continue to add features
              and improve the look of my website over time.
            </p>
          </div>
        </Col>
      </Row>
    </BodyComponent>
  );
}
