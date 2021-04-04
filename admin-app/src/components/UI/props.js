import React from "react";
import { Form } from "react-bootstrap";

function props(prop) {
  return (
    <Form.Group>
      <Form.Label>{prop.label}</Form.Label>

      <Form.Control
        type={prop.type}
        placeholder={prop.placeholder}
        value={prop.value}
        onChange={prop.onChange}
        name={prop.name}
      />
      <Form.Text className="text-muted">{prop.errorMessage}</Form.Text>
    </Form.Group>
  );
}

export default props;
