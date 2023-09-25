import React, {useState} from "react";
import classNames from 'classnames/bind';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    return ( 
    <div className={cx('sign-in-container')}>
        <form>
            <h1>Login</h1>
            <input type="email" placeholder="Email" value={email}></input>
            <input type="password" placeholder="Password" value={password}></input>
        </form>
    </div>  
    );
}

export default SignIn;