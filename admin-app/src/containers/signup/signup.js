import React, { useState } from "react";
import Layout from "../../components/layout/all";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/props";
import { SignUp } from "../../actions/signup";
function Signup3() {
  const authent = useSelector((state) => state.auth);
  const signup2 = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [signUp, setSignUp] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [pass, setpass] = useState("");
  function SignUp1(e) {
    e.preventDefault();
    const user = {
      email: signUp.email,
      password: pass,
      firstName: signUp.firstName,
      lastName: signUp.lastName,
    };
    console.log(user);
    dispatch(SignUp(user));
  }
  const use56r = signup2.message;
  if (authent.authenticate || use56r == "user registered succesfully") {
    return <Redirect to={"/"} />;
  }
  console.log(signup2.message);
  if (signup2.loading) {
    return <p>Loading...!!!!</p>;
  }

  function HandleChange1(e) {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name + value);
    setSignUp({
      ...signUp,
      [name]: value,
    });
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
                <Form onSubmit={SignUp1}>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="FirstName"
                    label="firstName"
                    defaultValue={signUp.firstName}
                    onChange={HandleChange1}
                  />
                  <Input
                    type="text"
                    placeholder="lastName"
                    name="lastName"
                    label="lastName"
                    defaultValue={signUp.lastName}
                    onChange={HandleChange1}
                  />
                  <Input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    label="email"
                    defaultValue={signUp.email}
                    onChange={HandleChange1}
                  />
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    label="password"
                    name="password"
                    onChange={(e) => setpass(e.target.value)}
                    value={pass}
                  />

                  <Button variant="primary" type="submit">
                    SignUp
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signup3;
