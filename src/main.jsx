import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Card from './expense-card/Card';
import { fetchExpenses } from './backend'; 

import Login from './login/Login';
import Navbar from './navbar/navbar';
import Register from './register/register';
import Profile from './profile/profile';

import './index.css'


function Expenses() {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const getExpenses = async () => {
      const data = await fetchExpenses();
      setExpenses(data);
    };

    getExpenses();
  }, []);

  return(

    <div className='card-list'>
        {expenses.map((expense) => (
          <Card 
            key={expense.id}
            title={expense.title}
            type="Expense"
            description={expense.description}
          />
        ))}
    </div>

  );
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Router>
  <Navbar />
  
    <Routes>
      <Route path="/" element={<Expenses />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile />}/>
    </Routes>

  </Router>
  </React.StrictMode>,
)
