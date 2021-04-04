import React from "react";
import { Container } from "react-bootstrap";
import Header from "../HEADER/index.js";

export default function all(props) {
  return (
    <>
      <Header />
      <Container>{props.children}</Container>
    </>
  );
}
