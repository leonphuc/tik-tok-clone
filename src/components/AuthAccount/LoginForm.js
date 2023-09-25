import classNames from 'classnames/bind';
import styles from './AuthAccount.module.scss';
import {
    CloseIcon,
    FacebookIcon,
    GoogleIcon,
    InstargramIcon,
    KaKaoTalkIcon,
    LineIcon,
    QRIcon,
    TwitterIcon,
    UserIcon,
} from '../Icons';
import { Button as BTN } from '@mui/material';
import { auth, provider, db } from '~/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { addDoc, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function LoginForm({ closeModal, setQRStatusModal, setSignUpStatusModal, setSignInStatusModal, setLoginStatus }) {
    const auth = getAuth();
    const [googleAccountValue, setGoogleAccountValue] = useState('');
    const [currentUser, setCurrentUser] = useState(false);

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                console.log('signInWithPopup: ', user);

                const ref = doc(db, 'userinfo', user.uid);
                const docSnap = await getDoc(ref);

                if (docSnap.exists()) {
                    console.log('Document data:', docSnap.data());
                } else {
                    // docSnap.data() will be undefined in this case
                    const setDocRef = await setDoc(ref, {
                        fullname: user.displayName,
                        email: user.email,
                        avatar: user.photoURL,
                        id: user.uid,
                    });
                    console.log('setDocRef', setDocRef);
                }

                closeModal(false);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    // useEffect(() => {
    //     setGoogleAccountValue(localStorage.setItem('email'));
    // });

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('wrap-container')}>
                    <div className={cx('contain')}>
                        <div className={cx('closeIcon')}>
                            <BTN onClick={() => closeModal(false)}>
                                <CloseIcon />
                            </BTN>
                        </div>
                        <div className={cx('login-modal')}>
                            <div className={cx('loginContainer')}>
                                <h2 className={cx('login-title')}>Log in to TikTok</h2>
                                <div className={cx('login-btns')}>
                                    <a
                                        className={cx('login-btn')}
                                        onClick={() => {
                                            setQRStatusModal(true);
                                            setLoginStatus(false);
                                        }}
                                    >
                                        <QRIcon />
                                        <p>Use QR code</p>
                                    </a>
                                </div>
                                <div className={cx('login-btns')}>
                                    <a
                                        className={cx('login-btn')}
                                        onClick={() => {
                                            setSignInStatusModal(true);
                                            setLoginStatus(false);
                                        }}
                                    >
                                        <UserIcon />
                                        <p>Email / username</p>
                                    </a>
                                </div>
                                <div className={cx('login-btns')}>
                                    <a outline onClick={handleGoogleLogin} className={cx('login-btn')}>
                                        <GoogleIcon />
                                        <p>Continue with Google</p>
                                    </a>
                                </div>
                                <div className={cx('login-btns')}>
                                    <a href="/" outline className={cx('login-btn')}>
                                        <FacebookIcon />
                                        <p>Continue with Facebook</p>
                                    </a>
                                </div>

                                <div className={cx('login-btns')}>
                                    <a href="/" outline className={cx('login-btn')}>
                                        <TwitterIcon />
                                        <p>Continue with Twitter</p>
                                    </a>
                                </div>
                                <div className={cx('login-btns')}>
                                    <a href="/" outline className={cx('login-btn')}>
                                        <LineIcon />
                                        <p>Continue with LINE</p>
                                    </a>
                                </div>
                                <div className={cx('login-btns')}>
                                    <a href="/" outline className={cx('login-btn')}>
                                        <KaKaoTalkIcon />
                                        <p>Continue with KakaoTalk</p>
                                    </a>
                                </div>
                                <div className={cx('login-btns')}>
                                    <a href="/" outline className={cx('login-btn')}>
                                        <QRIcon />
                                        <p>Continue with Apple</p>
                                    </a>
                                </div>
                                <div className={cx('login-btns')}>
                                    <a href="/" outline className={cx('login-btn')}>
                                        <InstargramIcon />
                                        <p>Continue with Instagram</p>
                                    </a>
                                </div>
                            </div>
                            <div className={cx('policy-tips')}>
                                <p>
                                    By continuing, you agree to TikTok’s <a>Terms of Service</a> and confirm that you
                                    have read TikTok’s <a>Privacy Policy</a>.
                                </p>
                            </div>
                            <div className={cx('footer')}>
                                <h3>Don’t have an account?</h3>
                                <h3>
                                    <a
                                        onClick={() => {
                                            setSignUpStatusModal(true);
                                            setLoginStatus(false);
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
        </div>
    );
}

export default LoginForm;
