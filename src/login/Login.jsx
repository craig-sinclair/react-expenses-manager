import './login.css';

function Login(){
    return(
        <>

        <div className="login-container">
            <form action="" className="login-form" autoComplete='off'>
            <h4 className='form-header'>LOG IN</h4>
            
                <div className='login-text-box-container'>
                    <input id="username-input" className="login-text-box" placeholder='Username'></input>
                </div>

                <div className='login-text-box-container'>
                    <input id="password-input" className="login-text-box" placeholder='Password'></input>
                </div>

                <button type='submit' className='login-btn' id='login-btn'>LOG IN</button>
            
            <a href='#' className='anchor-no-style'><p className='not-registered-text'>Not Yet Registered?</p></a>
            <a href='#' className='anchor-no-style'><p className='not-registered-text'>Forgot Password?</p></a>

            </form>

        </div>
        </>

    )
}
export default Login;