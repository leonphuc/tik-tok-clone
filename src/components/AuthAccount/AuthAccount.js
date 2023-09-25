import classNames from 'classnames/bind';
import styles from './AuthAccount.module.scss';
import GoogleLoginFFC from '../Login/GoogleLogin/GoogleLoginFFC';
import LoginForm from './LoginForm';
import QrForm from './QrForm';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { useState } from 'react';
const cx = classNames.bind(styles);

function LoginAuth({ closeModal }) {
    const [loginStatus, setLoginStatus] = useState(true);

    const [qrStatusModal, setQRStatusModal] = useState(false);

    const [signUpStatusModal, setSignUpStatusModal] = useState(false);

    const [signInStatusModal, setSignInStatusModal] = useState(false);

    return (
        <div>
            <div className={cx('modal')}>
                {loginStatus ? (
                    <LoginForm
                        closeModal={closeModal}
                        setLoginStatus={setLoginStatus}
                        setSignUpStatusModal={setSignUpStatusModal}
                        setSignInStatusModal={setSignInStatusModal}
                        setQRStatusModal={setQRStatusModal}
                    />
                ) : null}

                {qrStatusModal ? (
                    <QrForm
                        closeModal={closeModal}
                        setLoginStatus={setLoginStatus}
                        setSignUpStatusModal={setSignUpStatusModal}
                        setQRStatusModal={setQRStatusModal}
                    />
                ) : null}

                {signUpStatusModal ? (
                    <SignUpForm
                        closeModal={closeModal}
                        setLoginStatus={setLoginStatus}
                        setSignInStatusModal={setSignInStatusModal}
                        setSignUpStatusModal={setSignUpStatusModal}
                        setQRStatusModal={setQRStatusModal}
                    />
                ) : null}

                {signInStatusModal ? (
                    <SignInForm
                        closeModal={closeModal}
                        setLoginStatus={setLoginStatus}
                        setSignInStatusModal={setSignInStatusModal}
                        setSignUpStatusModal={setSignUpStatusModal}
                        setQRStatusModal={setQRStatusModal}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default LoginAuth;
