import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '~/firebase';
import { doc, getDoc } from 'firebase/firestore';

function AuthDetail() {
    const [authUser, setAuthUser] = useState(null);

    // useEffect(() => {
    //     const listen = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setAuthUser(user);
    //             console.log(user);
    //         } else {
    //             setAuthUser(null);
    //         }
    //     });
    //     return () => {
    //         listen();
    //     };
    // }, []);

    useEffect(() => {
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
                        console.log('get:', docSnap.data());
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

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('sign out successful');
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            {authUser ? (
                <>
                    <p>{`Signed In as ${authUser.email} ,${authUser.displayName}, ${authUser.fullname} `}</p>{' '}
                    <button onClick={userSignOut}>Sign Out</button>
                </>
            ) : (
                <p>Signed Out</p>
            )}
        </div>
    );
}

export default AuthDetail;
