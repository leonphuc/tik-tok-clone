import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/layouts/Poper';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import Tippy from '@tippyjs/react/headless';
import AccountPreview from './AccountPreview';
import Image from '../Image';

library.add(fas);

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            {/* <Tippy interactive placement="bottom" offset={[-20, 0]} delay={[800, 0]} render={renderPreview}>
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/364192660_1437316093718181_6692327859963894258_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=ZymiTeudvC0AX8_XSto&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfDUWDO2_9eZNL82OWMeHr2ReSFPfvWOErSTMhgo5EkObQ&oe=64FFEBF4"
                        alt=""
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>phucle</strong>
                            <FontAwesomeIcon className={cx('check')} icon="fa-solid fa-circle-check" />
                        </p>
                        <p className={cx('name')}>Phúc Lê</p>
                    </div>
                </div>
            </Tippy> */}

            <Tippy>
                <div className={cx('account-item')}>
                    <Image className={cx('avatar')} src={data.avatar} alt={data.avatar} />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon="fa-solid fa-circle-check" />}
                        </p>
                        <p className={cx('name')}>{data.full_name}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
