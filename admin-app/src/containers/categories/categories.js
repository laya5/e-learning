import { useEffect, useState } from "react";
import Layout from "../../components/layout/all";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategory } from "../../actions/categories.action";
import { Container, Row, Col, ListGroup, Modal, Button } from "react-bootstrap";
import "./categories.css";
import Input from "../../components/UI/props";

export default function Categories() {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [cg, setCg] = useState(""); /* for managing state of new category */
  const [parentId, setParentId] = useState("");
  const [catImage, setCatImage] = useState([]);
  const handleClose = () => {
    const form = new FormData();
    form.append("name", cg);
    form.append("parentId", parentId);
    form.append("categoryImage", catImage);
    dispatch(addCategory(form));
    console.log("hello");
    console.log(form);

    const cat = {
      cg,
      parentId,
      catImage,
    };
    console.log(cat);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const authent = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  function Cat(categories) {
    let myCa = [];
    for (let cate of categories) {
      myCa.push(
        <li key={cate.name}>
          {cate.name}
          {cate.children.length > 0 ? (
            <ul style={{ listStyleType: "none" }}>{Cat(cate.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCa;
  }
  const CreateCate = (categories, options = []) => {
    for (let cate of categories) {
      options.push({
        value: cate._id,
        name: cate.name,
      });
      if (cate.children.length > 0) {
        CreateCate(cate.children, options);
      }
    }
    return options;
  };
  const AllList = CreateCate(authent.Categories);
  const HandleChangeImage = (e) => {
    e.preventDefault();
    setCatImage(e.target.files[0]);
  };
  const Font = {
    fontFamily: "Oswald",
  };
  return (
    <Layout sidebar>
      <Container className="Container2">
        <Row md={12}>
          <Button variant="secondary" onClick={handleShow} className="floating">
            ADD+
          </Button>
        </Row>
        <Row className="row2" md={12}>
          <Col>{Cat(authent.Categories)}</Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} animation={false} style={Font}>
        <Modal.Header closeButton>
          <Modal.Title>New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            name="name"
            placeholder="Type category"
            value={cg}
            onChange={(e) => {
              setCg(e.target.value);
            }}
          />
          <label>Select Parent Category: </label>
          <select
            className="form-control"
            value={parentId}
            onChange={(e) => {
              setParentId(e.target.value);
            }}
          >
            {AllList.map((option) => (
              <option
                key={option.name}
                value={option.value}
                style={{ display: "block" }}
              >
                {option.name}
              </option>
            ))}
          </select>
          <label>Choose files:</label>
          <br />
          <input
            multiple
            name="categoryImage"
            type="file"
            onChange={HandleChangeImage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
