import React from "react";
import Header from "../HEADER/index.js";
import { NavLink } from "react-router-dom";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import "./styles.css";

export default function all(props) {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container
          fluid
          style={{
            marginLeft: "auto",
            position: "relative",
            top: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Row>
            <Col sm={3} md={2} className="SideBar">
              SIDE BAR
              <ul style={{ listStyleType: "none" }}>
                <li defaultKey="/">
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>Orders</NavLink>
                </li>
                <li>
                  <NavLink to={"/categories"}>Categories</NavLink>
                </li>
              </ul>
            </Col>
            <Col sm={10} style={{ marginLeft: "auto" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>{props.children}</Container>
      )}
    </>
  );
}
