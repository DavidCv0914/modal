import axios from "axios";

let url = "http://localhost:4000"
export const listEmpresa = async(values) =>
    await axios.post(`${url}/getEmpresa`, values) 