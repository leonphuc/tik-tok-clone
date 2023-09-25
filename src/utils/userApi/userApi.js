import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '~/firebase';
import { doc, getDoc } from 'firebase/firestore';

const userApi = {
    getMe: () => {
        const [authUser, setAuthUser] = useState(null);
        function getData() {
            const listen = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setAuthUser(user);
                    // console.log('setAuthUser 1: ', user);
                    const docRef = doc(db, 'userinfo', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log('Document data:', docSnap.data());
                        setAuthUser(docSnap.data());
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
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    id: '',
                    name: '',
                    email: '',
                    photoUrl: '',
                });
            }, 500);
        });
    },
};

export default userApi;
