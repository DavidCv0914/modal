import { useState } from "react";
import Button from "react-bootstrap/Button";
import { ModalSearch } from "./components/modals/ModalSearch";

function App() {
  const [eventModal, setEventModal] = useState(false);
  const [type,setType] = useState ("");
  const recibirDatos = (datos) => {
    console.log(datos);
    setEventModal(datos.close);
  };
  return (
    <>
      <form>
        <Button variant="primary" onClick={() => {
          setEventModal(!eventModal);
          setType("Ciudad");
          }}>
          abrir ciudad
        </Button>
        <Button variant="primary" onClick={() => {
          setEventModal(!eventModal);
          setType("Departamento");
          }}>
          abrir departamento
        </Button>
        {eventModal ? <ModalSearch search={{type:type}} devolucion={recibirDatos} /> : null}
      </form>
     
    </>
  );
}

export default App;
