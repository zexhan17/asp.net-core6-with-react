import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL + "/Compaign/";

export async function createCompaign(comp) {
    return await axios.post(API_URL + 'CreateCompaign', comp);
}

export async function GetCompaignsById(id) {
    return await axios.get(API_URL + 'GetCompaignsById?Id=' + id);
}

export async function FundedCompaigns() {
    return await axios.get(API_URL + 'FundedCompaigns');
}

export async function NonFundedCompaigns() {
    return await axios.get(API_URL + 'NonFundedCompaigns');
}

export async function markCompleted(id) {
    return await axios.get(API_URL + 'MarkCompaignCompleted?Id=' + id);
}