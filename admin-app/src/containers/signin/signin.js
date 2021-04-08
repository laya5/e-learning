import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../../components/layout/all";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/props";
import { Redirect } from "react-router";

const FormPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authent = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function Login1(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(login(user));
  }
  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.type;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  if (authent.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col md={6} lg={8}>
            <Card
              style={{
                margin: "5rem",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                marginTop: "5rem",
              }}
            >
              <p
                className="h4 text-center mb-4"
                style={{
                  color: "#7eca9c",
                  textShadow:
                    "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                }}
              >
                SignIn
              </p>
              <Card.Body>
                <Form onSubmit={Login1}>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    label="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                  />
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    label="password"
                    onChange={handleChange}
                    value={password}
                  />
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default FormPage;
