import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '~/firebase';
import { doc, getDoc } from 'firebase/firestore';

const useAuthSignUpUserDetail = () => {
    const [authUser, setAuthUser] = useState({});

    useEffect(() => {
        function getData() {
            const listen = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setAuthUser(user);
                    // console.log('setAuthUser 1: ', user);
                    const docRef = doc(db, 'userinfo', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        // console.log('Document data:', docSnap.data());
                        setAuthUser(docSnap.data());
                        // console.log('get:', docSnap.data());
                    } else {
                        // docSnap.data() will be undefined in this case
                        console.log('No such document!');
                    }
                } else {
                    setAuthUser(null);
                }
            });
            return () => {
                listen();
            };
        }
        getData();
    }, []);

    return { authUser };
};

export default useAuthSignUpUserDetail;
