import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import 'boxicons';
import { listEmpresa, listPerson } from "../../api/api";

export const ModalSearch = (props) => {
  const [show, setShow] = useState(true);
  const [options, setOptions] = useState([]);
  const [typeSearch, setTypeSearch] = useState("");
  const [content, setContent] = useState("");
  const [choice, setChoice] = useState([]);
  const [placeHolder, setPlaceHolder] = useState("");

  useEffect(()=>{
    if (props.search.type == "Empresa") {
      setPlaceHolder("Por codigo")
    }
    if (props.search.type == "Persona") {
      setPlaceHolder("Por identificación")
    }
  },[props]);
  const handleCloseSave = () => {
    setShow(false);
    switch (props.search.type) {
      case "Empresa":
        props.devolucion({ empresa: choice, close: false });
        break;
      case "Persona":
        props.devolucion({ persona: choice, close: false });
        break;
      default:
        break;
    }
  };
  const handleClose = () => {
    setShow(false);
    props.devolucion({ close: false });
  };

  const searchInfo = async () => {

    switch (props.search.type) {
      case "Empresa":
        if (typeSearch == "nombre") {
          const result = await listEmpresa({ name: content });
          setOptions(result.data);
        } else if (typeSearch == "codigo") {
          const result = await listEmpresa({ cod: content });
          setOptions(result.data);
        }
        break;
      case "Persona":
        if (typeSearch == "nombre") {
          const result = await listPerson({ name: content });
          setOptions(result.data);
        } else if (typeSearch == "codigo") {
          const result = await listPerson({ id: content });
          setOptions(result.data);
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {["radio"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="Por nombre"
                    checked={typeSearch == "nombre"}
                    onChange={(e) => setTypeSearch(e.target.value)}
                    value="nombre"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label={placeHolder}
                    checked={typeSearch == "codigo"}
                    onChange={(e) => setTypeSearch(e.target.value)}
                    value="codigo"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder={"Busque su " + props.search.type}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setContent(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={searchInfo}
                >
                  Buscar
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Container>
                {options.length > 0 ? (
                  <Form.Label>{props.search.type + " a escoger"}</Form.Label>
                ) : null}
                {options.length > 0 && props.search.type == "Empresa"
                  ? options.map((option) => (
                    <Row style={{ border: "solid 2px #AEB6BF" }} key={option.idempresa}>
                      <Col style={{ cursor: "pointer" }} xs={12} md={8} onClick={() => setChoice(option)}>
                        nit: {option.nit}
                      </Col>
                      <Col style={{ cursor: "pointer" }} xs={6} md={4} onClick={() => setChoice(option)}>
                        {option.nombre}
                      </Col>
                    </Row>
                  ))
                  : null}
                  {options.length > 0 && props.search.type == "Persona"
                  ? options.map((option) => (
                    <Row style={{ border: "solid 2px #AEB6BF" }} key={option.idusuario}>
                      <Col style={{ cursor: "pointer" }} xs={12} md={8} onClick={() => setChoice(option)}>
                        identificación: {option.idusuario}
                      </Col>
                      <Col style={{ cursor: "pointer" }} xs={6} md={4} onClick={() => setChoice(option)}>
                        {option.nombre}
                      </Col>
                    </Row>
                  ))
                  : null}
              </Container>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCloseSave}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
