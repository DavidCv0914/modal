import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ModalSearch } from "./components/modals/ModalSearch";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
  const [eventModal, setEventModal] = useState(false);
  const [choice, setChoice] = useState([]);
  const [type, setType] = useState("");
  const recibirDatos = (datos) => {
    setChoice(datos.data);
    setEventModal(datos.close);
  };
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        style={{
          width: "50%",
          border: "solid 3px #AEB6BF",
          borderRadius: "10px",
          padding: "1%",
          marginTop:"15%"
        }}
      >
        <Form.Label style={{width:"53%"}}>Nit de la Empresa</Form.Label>
        <Form.Label>Nombre de la empresa</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{display:"flex", justifyContent:"space-between"}}>
          <InputGroup className="mb-3" style={{width:"47%"}}>
            <Form.Control
              placeholder="Escriba"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={choice ? choice.nit : null}
            />
            <Button style={{display:"flex", alignItems:"center"}} variant="outline-secondary" id="button-addon2" onClick={() => {
            setEventModal(!eventModal);
            setType("Empresa");
          }}>
              <box-icon name='search' ></box-icon>
            </Button>
          </InputGroup>
          <Form.Control type="text" placeholder="Escriba" style={{width:"47%",height:"40px"}} value={choice ? choice.nombre : null } />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {eventModal ? (
          <ModalSearch search={{ type: type }} devolucion={recibirDatos} />
        ) : null}
    </section>
  );
}

export default App;
