import classNames from 'classnames/bind';
import styles from './ProfileEdit.scss';
import { Button as BTN, LinearProgress } from '@mui/material';
import { CloseIcon } from '~/components/Icons';
import { auth, provider, db, storage } from '~/firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { addDoc, collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref as REF, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import { useEffect, useState, useRef } from 'react';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { NightShelter } from '@mui/icons-material';

const cx = classNames.bind(styles);

function ProfileEdit({ closeModal, props }) {
    const auth = getAuth();
    const [authUser, setAuthUser] = useState({});
    const [isAvatarChange, setIsAvatarChange] = useState(false);

    const [values, setValues] = useState({
        email: '',
        fullname: '',
        bio: '',
        avatar: null,
    });

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
                        setValues(docSnap.data());
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

    const handleSubmission = async (e) => {
        e.preventDefault();

        const ref = doc(db, 'userinfo', authUser.id);
        await updateDoc(ref, {
            fullname: values.fullname,
            email: values.email,
            bio: values.bio,
        });

        const storage = getStorage();
        const metadata = {
            contentType: 'image/jpeg',
        };

        if (isAvatarChange) {
            const storageRef = REF(storage, 'images/' + values.avatar.name);
            const uploadTask = uploadBytesResumable(storageRef, values.avatar, metadata);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    // eslint-disable-next-line default-case
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    // eslint-disable-next-line default-case
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    // console.log(uploadTask.snapshot.ref);
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        // console.log('File available at', downloadURL);
                        await updateDoc(ref, {
                            avatar: downloadURL,
                        });
                    });
                },
            );
        }
    };

    const [file, setFile] = useState(null);

    const handleImageChange = (e) => {
        // console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('wrap-container')}>
                    <div className={cx('profile-edit-contain')}>
                        <div className={cx('edit-header')}>
                            <div className={cx('closeIcon')}>
                                <BTN onClick={() => closeModal(false)}>
                                    <CloseIcon />
                                </BTN>
                            </div>
                            <div className={cx('edit-title')}>
                                <h1>Edit Profile</h1>
                            </div>
                        </div>
                        <form>
                            <div className={cx('edit-container')}>
                                <div className={cx('edit-container-item')}>
                                    <div className={cx('edit-container-title')}>Profile photo</div>
                                    <div className={cx('edit-profile-avatar')}>
                                        <div>
                                            <div className={cx('edit-profile-avatar-preview')}>
                                                {!isAvatarChange ? (
                                                    <Image
                                                        className={cx('edit-profile-avatar-item')}
                                                        src={authUser.avatar}
                                                    />
                                                ) : (
                                                    <Image className={cx('edit-profile-avatar-item')} src={file} />
                                                )}
                                            </div>

                                            <div className={cx('edit-profile-avatar-btn')}>
                                                <input
                                                    type="file"
                                                    name="file-input"
                                                    id="file-input"
                                                    accept="image/png, image/jpeg"
                                                    onChange={function (event) {
                                                        setValues((prev) => ({
                                                            ...prev,
                                                            avatar: event.target.files[0],
                                                        }));
                                                        setIsAvatarChange(true);
                                                        handleImageChange(event);
                                                    }}
                                                />
                                                <label htmlFor="file-input">
                                                    <FontAwesomeIcon
                                                        icon="fa-solid fa-pen"
                                                        className={cx('edit-profile-avatar-icon')}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('edit-container-item')}>
                                    <div className={cx('edit-container-title')}>Username</div>
                                    <div className={cx('edit-profile-avatar')}>
                                        <input
                                            className={cx('edit-profile-input')}
                                            placeholder="Username"
                                            value={values.email}
                                            onChange={function (event) {
                                                // authUser.email = event.target.value;
                                                setValues((prev) => ({ ...prev, email: event.target.value }));
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={cx('edit-container-item')}>
                                    <div className={cx('edit-container-title')}>Full Name</div>
                                    <div className={cx('edit-profile-avatar')}>
                                        <input
                                            className={cx('edit-profile-input')}
                                            placeholder="Full Name"
                                            defaultValue={authUser.fullname}
                                            onChange={(event) => {
                                                setValues((prev) => ({ ...prev, fullname: event.target.value }));
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={cx('edit-container-item')}>
                                    <div className={cx('edit-container-title')}>Bio</div>
                                    <div className={cx('edit-profile-avatar')}>
                                        <textarea
                                            className={cx('edit-profile-input-bio')}
                                            placeholder="Bio"
                                            defaultValue={authUser.bio}
                                            onChange={(event) =>
                                                setValues((prev) => ({ ...prev, bio: event.target.value }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className={cx('edit-container-footer')}>
                            <Button
                                onClick={() => closeModal(false)}
                                className={cx('edit-container-footer-btn')}
                                outline
                            >
                                Cancel
                            </Button>
                            <Button className={cx('edit-container-footer-btn')} outline onClick={handleSubmission}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;
