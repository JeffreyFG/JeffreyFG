import BodyComponent from "../components/BodyComponent.tsx";
//import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
//import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import userType from "../types/userType.ts";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";

export default function CreatePostPage(user: userType) {
  const initialValue = "";
  return (
    <BodyComponent>
      <div className="container mt-8 mb-8">
        <p>Welcome {user.firstName}</p>
        <br></br>
      </div>
    </BodyComponent>
  );
}
