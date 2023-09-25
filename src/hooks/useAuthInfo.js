import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/firebase';

const useAuthInfo = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                // console.log('useAuthInfo: ', user.displayName);
            } else {
                setCurrentUser(null);
                console.log('useAuthInfo: Null ');
            }
        });
    });

    return { currentUser };
};

export default useAuthInfo;
