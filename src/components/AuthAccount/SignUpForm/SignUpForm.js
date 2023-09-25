import classNames from 'classnames/bind';
import styles from '../AuthAccount.module.scss';
import { CloseIcon, PrevIcon } from '../../Icons';
import { Button as BTN } from '@mui/material';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '~/firebase';
import { useAuth } from './UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '~/firebase';

const cx = classNames.bind(styles);

function SignUpFrom({ closeModal, setLoginStatus, setSignInStatusModal, setSignUpStatusModal, setQRStatusModal }) {
    const [values, setValues] = useState({
        name: '',
        email: '',
        pass: '',
        bio: '',
    });

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const signUp = (e) => {
    //     e.preventDefault();
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             console.log(userCredential);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    const [errorMsg, setErrorMsg] = useState('');
    const [submitButtonDisable, setSubmitButtonDisable] = useState(false);

    const handleSubmission = (e) => {
        e.preventDefault();
        if (!values.name || !values.email || !values.pass) {
            setSubmitButtonDisable(true);
            setErrorMsg('Fill all fields');
            return;
        }
        setSubmitButtonDisable(true);
        setErrorMsg('');

        createUserWithEmailAndPassword(auth, values.email, values.pass, values.name)
            .then(async (res) => {
                //////////************Khong xoa  */
                // Tạo user với document id khác với UID nhưng document id truyền vào mảng
                /////////************Khong xoa  */
                // const colRef = collection(db, 'users');
                // return await addDoc(colRef, {
                //     bio: values.bio,
                //     // userId: `${res.user.uid}`,
                // });

                // Tạo user với document id bằng với UID
                const ref = doc(db, 'userinfo', res.user.uid);
                const docRef = await setDoc(ref, { fullname: values.name, email: values.email, id: res.user.uid });
                // const docRef = await setDoc(ref);
                console.log(ref);
                console.log(docRef);
            })
            .catch((err) => {
                console.log('Error: ', err);
                // setSubmitButtonDisable(false);
                setErrorMsg(err.message);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrap-container')}>
                <div className={cx('contain')}>
                    <div className={cx('prevIcon')}>
                        <BTN
                            onClick={() => {
                                setLoginStatus(true);
                                setQRStatusModal(false);
                            }}
                        >
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
                                <form>
                                    <h2 className={cx('login-title')}>Sign up</h2>
                                    <div className={cx('signup-wrapper')}>
                                        <div className={cx('signup-contain')}>
                                            <div className={cx('signup-form')}>
                                                <input
                                                    type="text"
                                                    placeholder="Your Name"
                                                    onChange={(event) =>
                                                        setValues((prev) => ({ ...prev, name: event.target.value }))
                                                    }
                                                    className={cx('signup-input')}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('signup-contain')}>
                                            <div className={cx('signup-form')}>
                                                <input
                                                    type="text"
                                                    placeholder="Email address"
                                                    id=""
                                                    onChange={(event) =>
                                                        setValues((prev) => ({ ...prev, email: event.target.value }))
                                                    }
                                                    className={cx('signup-input')}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('signup-contain')}>
                                            <div className={cx('signup-form')}>
                                                <input
                                                    type="text"
                                                    placeholder="Password"
                                                    onChange={(event) =>
                                                        setValues((prev) => ({ ...prev, pass: event.target.value }))
                                                    }
                                                    className={cx('signup-input')}
                                                />
                                            </div>
                                        </div>

                                        {/* <div className={cx('signup-contain')}>
                                            <div className={cx('signup-form')}>
                                                <input
                                                    type="text"
                                                    placeholder="Re-Enter the password"
                                                    name="confirmPassword"
                                                    
                                                    onChange={UserHandler}
                                                    className={cx('signup-input')}
                                                />
                                            </div>
                                        </div> */}
                                        <div className={cx('signup-contain')}>
                                            <div className={cx('check-form')}>
                                                <input
                                                    type="checkbox"
                                                    placeholder="Re-enter the password"
                                                    value=""
                                                    className={cx('signup-check')}
                                                />
                                                <label>
                                                    Get trending content, newsletters, promotions, recommendations, and
                                                    account updates sent to your email
                                                </label>
                                            </div>
                                        </div>
                                        <div className={cx('signup-contain')}>
                                            <p className={cx('error')}>{errorMsg}</p>
                                        </div>
                                        <div className={cx('signup-contain')}>
                                            <Button
                                                primary
                                                large
                                                onClick={handleSubmission}
                                                disabled={submitButtonDisable}
                                                className={cx('signup-btn')}
                                            >
                                                Sign Up
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
                            <h3>Already have an account? </h3>
                            <h3>
                                <a
                                    onClick={() => {
                                        setSignInStatusModal(true);
                                        setSignUpStatusModal(false);
                                    }}
                                >
                                    Log in
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpFrom;
