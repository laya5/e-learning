import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Layout from "../../components/layout/all";
import "./styles.css";
function home() {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col sm={2} className="SideBar">
            <NavLink ></NavLink>
          </Col>
          <Col sm={10} style={{ marginLeft: "auto" }}>
            Main Content
          </Col>
        </Row>
      </Container>
      {/*<Jumbotron style={{ margin: "5rem" }}>
        <h1>HELLO ADMIN!</h1>
        <p>
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
      </Jumbotron>*/}
    </Layout>
  );
}

export default home;
