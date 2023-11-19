import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL + "/Auth/";

export async function loginUser(data){
    return await axios.post(API_URL + 'Login', data);
}

export async function Register(data){
    return await axios.post(API_URL + 'Register', data);
}

export function VerifyToken(){
    return axios.get(API_URL + 'VerifyToken');
}