import { useContext, createContext, useEffect, useState } from 'react';
import { AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '~/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

const UserAuthContext = ({ children }) => {
    const [error, setError] = useState('');
    const [currentuser, setCurrentUser] = useState();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                setCurrentUser(user);
                console.log('u are logging');
            } else {
            }
        });
    }, [currentuser]);

    const signUp = async (email, password, FullName) => {
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                console.log(result);
                try {
                    const docRef = await addDoc(collection(db, 'users'), {
                        FullName,
                        userId: `${result.user.uid}`,
                    });
                    alert('Create successfully');
                    console.log('Doccument written Id: ', docRef.id);
                } catch (e) {
                    console.error('Error adding document: ', e);
                }
            })
            .catch((err) => {
                if (err.code === 'auth/email-already-in-use') {
                    setInterval(() => {
                        setError('');
                    }, 5000);
                    setError('email already in use try another email');
                } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
                    setInterval(() => {
                        setError('');
                    }, 5000);
                    setError('Password must be 6 character');
                } else {
                    setError(err.message);
                }
            });
    };
    const value = {
        signUp,
        error,
        currentuser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default UserAuthContext;
