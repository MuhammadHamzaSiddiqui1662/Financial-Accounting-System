import axios from 'axios';

const url = 'http://localhost:5000/Ledger/'

export const fetchAllTAccounts = () => axios.get(url);

export const fetchSpecificTAccount = id => axios.get(url + id);

export const patchTAccount = tAcc => axios.patch(url, { tAcc });

export const postTAccount = tAcc => axios.post(url, { tAcc });