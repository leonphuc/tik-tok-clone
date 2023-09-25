import classNames from 'classnames/bind';
import styles from '../AuthAccount.module.scss';
import { CloseIcon, PrevIcon } from '../../Icons';
import { Button as BTN } from '@mui/material';
import Button from '~/components/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '~/firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignInForm({ closeModal, setLoginStatus, setSignUpStatusModal, setSignInStatusModal }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                console.log('userCredential: ', userCredential);

                /// Lay token
                const auth = getAuth();
                const user = auth.currentUser;
                console.log('getIdToken:', user.getIdToken());
                const token = await user.getIdToken();
                console.log('Logged in user token:', token);

                // Đăng nhập chuyển hướng đến user
                // navigate(`/@${userCredential.user.email}`);

                closeModal(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrap-container')}>
                <div className={cx('contain')}>
                    <div className={cx('prevIcon')}>
                        <BTN onClick={() => setLoginStatus(true)}>
                            <PrevIcon />
                        </BTN>
                    </div>

                    <div className={cx('closeIcon')}>
                        <BTN onClick={() => closeModal(false)}>
                            <CloseIcon />
                        </BTN>
                    </div>

                    <div className={cx('login-modal')}>
                        <div className={cx('loginContainer')}>
                            <div className={cx('signup-container')}>
                                <form onSubmit={signIn}>
                                    <h2 className={cx('login-title')}>Log in with Account</h2>
                                    <div className={cx('signup-wrapper')}>
                                        <div className={cx('signup-contain')}>
                                            <div className={cx('signup-form')}>
                                                <input
                                                    type="text"
                                                    placeholder="Email address"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={cx('signup-input')}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('signup-contain')}>
                                            <div className={cx('signup-form')}>
                                                <input
                                                    type="text"
                                                    placeholder="Password"
                                                    name="email"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={cx('signup-input')}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('signup-contain')}>
                                            <Button primary large className={cx('signup-btn')} type="submit">
                                                Log In
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={cx('policy-tips')}>
                            <p>
                                By continuing, you agree to TikTok’s <a>Terms of Service</a> and confirm that you have
                                read TikTok’s <a>Privacy Policy</a>.
                            </p>
                        </div>
                        <div className={cx('footer')}>
                            <h3>Don’t have an account?</h3>
                            <h3>
                                <a
                                    onClick={() => {
                                        setSignUpStatusModal(true);
                                        setSignInStatusModal(false);
                                    }}
                                >
                                    Sign up
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInForm;
