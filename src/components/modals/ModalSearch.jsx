import { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { listCiudad,listDepartamento } from "../../api/api";

export const ModalSearch = (props) => {
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [cod, setCod] = useState("");
  const [options,setOptions] = useState([]);

  const handleCloseSave = () => {
    setShow(false);
    props.devolucion({ data: name, close: false });
  };
  const handleClose = () => {
    setShow(false);
    props.devolucion({ close: false });
  };
  const handleShow = () => setShow(true);

  useEffect(()=>{
    if (props.search.type === "Ciudad") {
        setOptions(listCiudad)
    }else if(props.search.type === "Departamento"){
        setOptions(listDepartamento)
    }
  },[]);

    const handleOnchange = (e) =>{
    setName(e.target.value)
    }

  console.log(options);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder={"Escriba nombre de " + props.search.type}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                onChange={(e) => setCod(e.target.value)}
                type="text"
                placeholder={"Escriba codigo de " + props.search.type}
                autoFocus
              />
              
              <Form.Label>{props.search.type+" a escoger"}</Form.Label>
              <Form.Select aria-label="Default" onChange={handleOnchange}>
                <option>{"Seleccione "+props.search.type}</option>
                {options.length>0 ? options.map((option)=>(<option key={option} value={option}>{option}</option>)):null}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
