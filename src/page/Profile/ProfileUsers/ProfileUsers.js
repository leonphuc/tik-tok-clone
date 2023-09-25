import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import { useEffect, useRef, useState } from 'react';
import { db } from '~/firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from '../profile.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Video from '~/Video';
const cx = classNames.bind(styles);
library.add(fas);

function ProfileUsers({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile-header')}>
                <div className={cx('profile-contain')}>
                    <div className={cx('profile-avatar')}>
                        <Image
                            className={cx('profile-user-avatar')}
                            src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/077bc10284291577afce9b768a91cd7d~c5_100x100.jpeg?x-expires=1695186000&x-signature=GwX%2B7YTUlTuIv6HHlhp0We%2FarWg%3D"
                        />
                    </div>
                    <div className={cx('profile-info')}>
                        <h1>Phúc Lê</h1>
                        <h2>phucle</h2>
                        <div className={cx('profile-edit')}>
                            <Button
                                className={cx('profile-edit-btn')}
                                outline
                                small
                                leftIcon={
                                    <FontAwesomeIcon
                                        icon="fa-solid fa-pen-to-square"
                                        className={cx('profile-edit-icon')}
                                    />
                                }
                            >
                                Edit profile
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('user-counter')}>
                    <h3>
                        <div className={cx('user-following-counter')}>
                            <strong className={cx('user-following-counter-num')}>10</strong>
                            <span>Following</span>
                        </div>
                        <div className={cx('user-following-counter')}>
                            <strong className={cx('user-following-counter-num')}>10</strong>
                            <span>Followers</span>
                        </div>
                        <div className={cx('user-following-counter')}>
                            <strong className={cx('user-following-counter-num')}>10</strong>
                            <span>Likes</span>
                        </div>
                    </h3>
                </div>
            </div>
            <div className={cx('contain')}>
                <div className={cx('contain-list')}>
                    <Button className={cx('contain-btn')}>Videos</Button>
                    <Button className={cx('contain-btn')}>Favorites</Button>
                    <Button className={cx('contain-btn')}>Liked</Button>
                </div>
                <div className={cx('contain-videos')}>
                    <div className={cx('contain-videos-item')}>
                        <video
                            className={cx('video-item')}
                            // src={}
                            muted="true"
                            playsInline
                            reload="none"
                            // autoPlay="true"
                            loop
                        />
                        <p>description</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileUsers;
