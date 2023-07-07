import axios from "axios";

let url = "http://localhost:4000";

export const listEmpresa = async(values) =>
    await axios.post(`${url}/getEmpresa`, values) 

export const listPerson = async(values) =>
    await axios.post(`${url}/getPerson`, values) 

export const getDatos = async(values) =>
    await axios.post(`${url}/getDatos`, values) 