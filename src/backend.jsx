import axios from 'axios'

const API_URL = 'http://localhost:5000/api/expenses';

//SELECT * From expenses table
export const fetchExpenses = async () => {
    try{
        const response = await axios.get(API_URL, {
            withCredentials: true
        });
        return response.data;
    }
    catch(err){
        console.log(`Error fetching expenses: `, err)
        return [];
    }
};

//Register a new user on PostgreSQL db (insert into users)
export const registerUser = async (userData) => {

    //User data includes username, email, password and budget
    try{
        const response = await axios.post('http://localhost:5000/api/register', userData, {
            withCredentials: true
        });
        return response.data;
    }
    catch (err){
        console.log(`Error registering user`, err);
        throw err;
    }
}