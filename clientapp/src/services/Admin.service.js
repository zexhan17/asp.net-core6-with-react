import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL + "/Admin/";

export async function GetAllTransactions(){
    return await axios.get(API_URL + 'GetAllTransactions');
}

export async function GetAllCompaigners(){
    return await axios.get(API_URL + 'GetAllCompaigners');
}

export async function GetAllDonors(){
    return await axios.get(API_URL + 'GetAllDonors');
}

export async function GetCompaignById(id){
    return await axios.get(API_URL + 'GetCompaignById?Id=' + id);
}

export async function makeManualTransaction(data){
    return await axios.post(API_URL + 'MakeManualTransaction', data);
}

export async function updateStats(data){
    return await axios.post(API_URL + 'UpdateStats', data);
}

export async function assignAdmin(data){
    return await axios.post(API_URL + 'AssignAdmin', data);
}

export async function getRequests(){
    return await axios.get(API_URL + 'GetRequests');
}

export async function Verify(id){
    return await axios.get(API_URL + "VerifyCompaigner?Id=" + id)
}

export async function getMsgs(){
    return await axios.get(API_URL + 'GetMessages')
}

export async function changeTransactionStatus(id){
    return await axios.get(API_URL + 'ChangeTransactionStatus?Id=' + id)
}