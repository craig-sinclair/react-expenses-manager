import {useState, useEffect} from 'react'
import './profile.css'
import axios from 'axios'

function Profile() {
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    // Check if a user is logged in
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

    // Display default message for non-logged in sessions
    if (!isloggedIn){
        return(
            <div className='profile-container'>
                <h2>Hey there! Consider creating an account or logging in?</h2>
            </div>
        )
    }

    return(
        <>
            <div className='profile-container'>
                <h2>Hello, {`${username}`} welcome back to your account!</h2>
            </div>
        </>
    )
}

export default Profile;
