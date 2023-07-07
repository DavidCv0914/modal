import { useState,useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ModalSearch } from "./components/modals/ModalSearch";
import InputGroup from "react-bootstrap/InputGroup";
import { getDatos } from "./api/api";

function App() {
  const codEmpresa = useRef(null);
  const nameEmpresa = useRef(null);
  const idPerson = useRef(null);
  const namePerson = useRef(null);
  const [eventModal, setEventModal] = useState(false);
  const [choice, setChoice] = useState([]);
  const [person, setPerson] = useState([]);
  const [type, setType] = useState("");

  const recibirDatos = (datos) => {
    if (datos.empresa) {
      setChoice(datos.empresa);
    }
    if (datos.persona) {
      setPerson(datos.persona);
    }
    
    setEventModal(datos.close);
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()
  
    const result = await getDatos({ 
      nit:codEmpresa.current.value,
      nameEmpresa:nameEmpresa.current.value,
      idPerson:idPerson.current.value,
      namePerson:namePerson.current.value
    });
    console.log(result.data);
  }


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
        onSubmit={handleSubmit}
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
              ref={codEmpresa}
              name="nit"
              placeholder="Escriba"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              defaultValue={choice ? choice.nit : null}
            />
            <Button style={{display:"flex", alignItems:"center"}} variant="outline-secondary" id="button-addon2" onClick={() => {
            setEventModal(!eventModal);
            setType("Empresa");
          }}>
              <box-icon name='search' ></box-icon>
            </Button>
          </InputGroup>
          <Form.Control ref={nameEmpresa} name="nameEmpresa" type="text" placeholder="Escriba" style={{width:"47%",height:"40px"}} defaultValue={choice ? choice.nombre : null } />
        </Form.Group>
        <Form.Label style={{width:"53%"}}>id de la persona</Form.Label>
        <Form.Label>Nombre de la person</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{display:"flex", justifyContent:"space-between"}}>
          <InputGroup className="mb-3" style={{width:"47%"}}>
            <Form.Control
              ref={idPerson}
              name="idPerson"
              placeholder="Escriba"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              defaultValue={person ? person.idusuario : null}
            />
            <Button style={{display:"flex", alignItems:"center"}} variant="outline-secondary" id="button-addon2" onClick={() => {
            setEventModal(!eventModal);
            setType("Persona");
          }}>
              <box-icon name='search' ></box-icon>
            </Button>
          </InputGroup>
          <Form.Control ref={namePerson} name="namePerson" type="text" placeholder="Escriba" style={{width:"47%",height:"40px"}} defaultValue={person ? person.nombre : null } />
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
