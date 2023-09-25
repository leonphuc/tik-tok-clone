import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import PropTypes from 'prop-types';
import AccountItem from './AccountItem';
import { useState, useRef, useEffect } from 'react';
const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [accountValue, setAccountValue] = useState('');
    const [accountResult, setAccountResult] = useState([]);
    const [btnMoreLess, setBtnMorLess] = useState(false);

    const [url, setUrl] = useState(`https://tiktok.fullstack.edu.vn/api/users/search?q=${makeid(1)}&type=less`);

    const inputRef = useRef();

    /// Hàm random (length) chữ cái
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setAccountResult(res.data);
            });
    }, [url]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {accountResult.map((result) => (
                <AccountItem key={result.id} data={result} />
            ))}

            {!btnMoreLess ? (
                <button
                    className={cx('more-btn')}
                    onClick={() => {
                        setUrl(`https://tiktok.fullstack.edu.vn/api/users/search?q=${makeid(1)}&type=more`);
                        setBtnMorLess(true);
                    }}
                >
                    See more
                </button>
            ) : (
                <button
                    className={cx('more-btn')}
                    onClick={() => {
                        setUrl(`https://tiktok.fullstack.edu.vn/api/users/search?q=${makeid(1)}&type=less`);
                        setBtnMorLess(false);
                    }}
                >
                    See less
                </button>
            )}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
