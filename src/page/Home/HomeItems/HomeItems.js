import React, { useEffect, useRef, useState } from 'react';
import styles from './HomeItems.module.scss';

import Icons, { MutedIcon, UnmutedIcon } from '~/components/Icons/Icons';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import LazyLoad from 'react-lazyload';
import Video from '~/Video';
import Home from '../Home';

library.add(fas);

const cx = classNames.bind(styles);

function HomeItems({ props, data, forYou }) {
    const videoRef = useRef();
    return (
        // <LazyLoad height={762} width={400} threshold={0.9}>
        <div className={cx('wrapper')}>
            <div className={cx('item-container')}>
                <div className={cx('item-avatar')}>
                    <Image className={cx('avatar')} src={data.user.avatar} />
                </div>
                <div className={cx('item')}>
                    <div className={cx('title-item')}>
                        <div className={cx('item-info')}>
                            <div className={cx('user')}>
                                <h3>{data.user.nickname}</h3>
                                <h4>{data.user.bio}</h4>
                            </div>
                            <div className={cx('item-bio')}>
                                <span>{data.description}</span>
                            </div>
                            <div className={cx('item-music')}>
                                <FontAwesomeIcon icon="fa-solid fa-music" />
                                <span>{data.music}</span>
                            </div>
                        </div>
                        <div className={cx('follow-btn')}>
                            <Button outline>Follow</Button>
                        </div>
                    </div>
                    <div className={cx('item-video')}>
                        <div className={cx('video')}>
                            <Video ref={videoRef} resourceVideo={data.file_url} />
                        </div>

                        <div className={cx('item-btn')}>
                            <div className={cx('btn-text')}>
                                <button className={cx('btn')}>
                                    <FontAwesomeIcon className={cx('item-icon')} icon="fa-solid fa-heart" />
                                </button>
                                <span>{data.likes_count}</span>
                            </div>
                            <div className={cx('btn-text')}>
                                <button className={cx('btn')}>
                                    <FontAwesomeIcon className={cx('item-icon')} icon="fa-solid fa-comment-dots" />
                                </button>
                                <span>{data.comments_count}</span>
                            </div>
                            <div className={cx('btn-text')}>
                                <button className={cx('btn')}>
                                    <FontAwesomeIcon className={cx('item-icon')} icon="fa-solid fa-bookmark" />
                                </button>
                                <span>{data.comments_count}</span>
                            </div>
                            <div className={cx('btn-text')}>
                                <button className={cx('btn')}>
                                    <FontAwesomeIcon className={cx('item-icon')} icon="fa-solid fa-share" />
                                </button>
                                <span>{data.shares_count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </LazyLoad>
    );
}

export default HomeItems;
