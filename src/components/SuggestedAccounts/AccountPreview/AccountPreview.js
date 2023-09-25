import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    alt="avatar"
                    src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/364192660_1437316093718181_6692327859963894258_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=ZymiTeudvC0AX8_XSto&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfDUWDO2_9eZNL82OWMeHr2ReSFPfvWOErSTMhgo5EkObQ&oe=64FFEBF4"
                />
                <div>
                    <Button primary className={cx('follow-btn')}>
                        Follow
                    </Button>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>phucle</strong>
                        <FontAwesomeIcon className={cx('check')} icon="fa-solid fa-circle-check" />
                    </p>
                    <p className={cx('name')}>Phúc Lê</p>
                    <p className={cx('analytics')}>
                        <strong className={cx('value')}>7.2B </strong>
                        <span className={cx('label')}>Followers</span>

                        <strong className={cx('value')}>6B </strong>
                        <span className={cx('label')}>Likes</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AccountPreview;
