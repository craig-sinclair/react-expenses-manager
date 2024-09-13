import './navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="navbar-desktop">
                <ul className="navbar-ul-desktop">
                    <li><a href="#"><b>Expense Tracker</b></a></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Add</Link></li>
                    <li><Link to="/">Details</Link></li>
                    <li><Link to="/login">Login</Link></li>
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
                    <li><Link to="/login">Login</Link></li>

                </ul>
            </nav>
        </>
    );
}

export default Navbar;
