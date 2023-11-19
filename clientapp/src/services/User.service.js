import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL + "/User/";

export async function GetProfileDetails(id) {
    return await axios.get(API_URL + `GetProfileDetails?Id${id}`);
}

export async function UpdateAccountNumber(id, acc) {
    return await axios.get(API_URL + `UpdateAccountNumber?Id${id}&AccountNumber=${acc}`);
}

export async function GetStats(){
    return await axios.get(API_URL + 'GetStats');
}

export async function contact(data){
    return await axios.post(API_URL + 'Contact', data);
}

export async function getemail(){
    return await axios.get(API_URL + `Getemail?id${id}`)
}

export async function getNotifications(){
    return await axios.get(API_URL + `GetNotifications`)
}

export async function checkNotifications(){
    return await axios.get(API_URL + `CheckNotifications`)
}

export async function eligibleForCompaign(){
    return await axios.get(API_URL + `EligibleForCompaign`)
}
