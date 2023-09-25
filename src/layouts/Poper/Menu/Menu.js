import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/layouts/Poper';
import styles from './Menu.module.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

library.add(fas);

const cx = classNames.bind(styles);

// eslint-disable-next-line no-unused-vars
const defaultFn = () => {};

function Menu({ children, hideOnClick = false, items = [], onChange }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isPartent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isPartent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                        if (item.logOut) {
                            item.logOut();
                        }
                        if (item.logTest) {
                            item.logTest();
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    /// Reset to first page Language
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            interactive
            hideOnClick={hideOnClick}
            offset={[12, 8]}
            delay={[0, 700]}
            placement="bottom-end"
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
