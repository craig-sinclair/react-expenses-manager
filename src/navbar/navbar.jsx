import './navbar.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    // Check if a user is authenticated or not
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/check-auth', {
                    withCredentials: true, 
                });

                if (response.data.loggedIn) {
                    setIsLoggedIn(true);
                    setUsername(response.data.username);
                }
            } 
            catch (error) {
                console.error('User not authenticated:', error);
                setIsLoggedIn(false);  
            }
        };

        checkAuthStatus(); 
    }, []); 

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="navbar-desktop">
                <ul className="navbar-ul-desktop">
                    <li><a href="#"><b>Expense Tracker</b></a></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Add</Link></li>
                    <li><Link to="/">Details</Link></li>

                    {/* Display 'Login' if not logged in; or their username if they are */}
                    {isloggedIn ? (
                        <li><Link to="/profile">{`${username}`}</Link></li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                    
                </ul>
            </nav>

            {/* Mobile Navbar */}
            <nav className="navbar-mobile">
                <div className="navbar-header">
                    <a href="#" className="navbar-title"><b>Expense Tracker</b></a>
                    <div className="hamburger" onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>

                <ul className={`navbar-ul-mobile ${isOpen ? 'open' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Add</Link></li>
                    <li><Link to="/">Details</Link></li>
                    {isloggedIn ? (
                        <li><Link to="/profile">{`${username}`}</Link></li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
