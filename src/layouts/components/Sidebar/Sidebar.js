import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    FollowingIcon,
    FollowingIconActive,
    HomeActiveIcon,
    HomeIcon,
    LiveIcon,
    LiveIconActive,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import Button from '~/components/Button/Button';
import { useState } from 'react';
import AuthAccount from '~/components/AuthAccount';
import { useAuthInfo } from '~/hooks';

const cx = classNames.bind(styles);

function Sidebar() {
    // const currentUser = false;
    const { currentUser } = useAuthInfo();

    const [modal, setModal] = useState(false);

    return (
        <div className={cx('wrapper')}>
            {modal && <AuthAccount closeModal={setModal} />}

            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<FollowingIcon />}
                    activeIcon={<FollowingIconActive />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveIconActive />} />
            </Menu>

            {!currentUser ? (
                <div className={cx('side-bar-content')}>
                    <p>Log in to follow creators, like videos, and view comments.</p>
                    <Button
                        large
                        outline
                        className={cx('side-bar-btn')}
                        onClick={() => {
                            setModal(true);
                        }}
                    >
                        Log in
                    </Button>
                </div>
            ) : null}
            <SuggestedAccounts label="Suggestion Accounts" />
            {/* <SuggestedAccounts label="Following" /> */}
        </div>
    );
}

export default Sidebar;
