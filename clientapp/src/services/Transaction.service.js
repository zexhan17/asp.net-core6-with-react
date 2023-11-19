import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL + "/Transaction/";

export async function SaveTransaction(data){
    return await axios.post(API_URL + 'SaveTransaction', data);
}

export async function transferOnline(id){
    return await axios.get(API_URL + `TransferOnline?id=${id}`);
}