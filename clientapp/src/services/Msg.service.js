import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL + "/Message/";

export async function SaveMessage(msg) {
    return await axios.post(API_URL + `SaveMessage`, msg);
}
