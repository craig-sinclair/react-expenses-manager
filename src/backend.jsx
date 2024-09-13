import axios from 'axios'

const API_URL = 'http://localhost:5000/api/expenses';

export const fetchExpenses = async () => {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }
    catch(err){
        console.log(`Error fetching expenses: `, err)
        return [];
    }
};