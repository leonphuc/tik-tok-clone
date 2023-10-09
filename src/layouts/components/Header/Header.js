import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import config from '~/config';
import Button from '~/components/Button/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '../../Poper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Seacrh from '../Search';
import AuthAccount from '~/components/AuthAccount';
import { useState } from 'react';
import useAuthSignUpUserDetail from '~/hooks/useAuthSignUpUserDetail';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';
import { useNavigate } from 'react-router-dom';

library.add(fas);

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon="fa-solid fa-earth-asia" />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon="fa-solid fa-circle-question" />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon="fa-solid fa-keyboard" />,
        title: 'Keyboard shortcut',
    },
];

function Header() {
    // const currentUser = false;

    const navigate = useNavigate();

    const { authUser } = useAuthSignUpUserDetail();

    const [modal, setModal] = useState(false);

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //Handle change language
                break;
            default:
        }
    };

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('sign out successful');
                navigate(`/`);
            })
            .catch((error) => console.log(error));
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-user" />,
            title: 'View profile',
            to: `/@profile`,
        },
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-coins" />,
            title: 'Get coins',
            to: '/coin',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-gear" />,
            title: 'Settings',
        },
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />,
            title: 'Log out',
            to: '/',
            logOut: function () {
                userSignOut();
            },
        },
    ];
    // console.log(currentUser);
    return (
        <header className={cx('wrapper')}>
            {authUser ? console.log('Header.js: ', authUser.email) : console.log('none')}

            {modal && <AuthAccount closeModal={setModal} />}
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>
                <Seacrh />
                <div className={cx('actions')}>
                    {authUser ? (
                        <>
                            <Tippy delay={[0, 200]} placement="bottom" content="Upload video">
                                <button className={cx('action-btn')}>
                                    <div className={cx('btn-border')}>
                                        <UploadIcon />
                                        <span className={cx('upload-text')}>Upload</span>
                                    </div>
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button
                                primary
                                onClick={() => {
                                    setModal(true);
                                }}
                            >
                                Log in
                            </Button>
                        </>
                    )}
                    {authUser ? (
                        <Menu items={authUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                            {authUser ? (
                                <Image
                                    src={authUser.avatar}
                                    className={cx('user-avatar')}
                                    alt={authUser.fullname}
                                    fallback="https://www.elegantthemes.com/blog/wp-content/uploads/2020/08/000-http-error-codes.png"
                                />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                                </button>
                            )}
                        </Menu>
                    ) : null}
                </div>
            </div>
        </header>
    );
}

export default Header;
