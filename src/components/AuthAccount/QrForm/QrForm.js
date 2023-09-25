import classNames from 'classnames/bind';
import styles from '../AuthAccount.module.scss';
import { CloseIcon, PrevIcon } from '../../Icons';
import { Button as BTN } from '@mui/material';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function QrForm({ closeModal, setLoginStatus, setSignUpStatusModal, setQRStatusModal }) {
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
                            <div className={cx('Qr-container')}>
                                <h2 className={cx('login-title')}>Log in with QR code</h2>
                                <div className={cx('Qr-wrapper')}>
                                    <div className={cx('Qr-contain')}>
                                        <div className={cx('Qr-form')}>
                                            <Image
                                                className={cx('Qr-img')}
                                                src="https://m.media-amazon.com/images/I/51vaz63gSzL.jpg"
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('Qr-tip')}>
                                        <p>1. Scan with your mobile device’s camera </p>
                                        <p>2. Confirm your emotional</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('footer')}>
                            <h3>Don’t have an account?</h3>
                            <h3>
                                <a
                                    onClick={() => {
                                        setSignUpStatusModal(true);
                                        setQRStatusModal(false);
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

export default QrForm;
