import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import { useEffect, useRef, useState } from 'react';
import { db } from '~/firebase';
import { collection, getDocs, doc } from 'firebase/firestore';
import styles from './profile.module.scss';

import Image from '~/components/Image';
import Button from '~/components/Button';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/firebase';
import { getDoc } from 'firebase/firestore';
import { useAuthSignUpUserDetail } from '~/hooks';
import ProfileEdit from './ProfileEdit';

const cx = classNames.bind(styles);

library.add(fas);

function Profile() {
    // const [currentUser, setCurrentUser] = useState({});
    const [modal, setModal] = useState(false);

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

    if (authUser) {
        return (
            <>
                {modal && <ProfileEdit closeModal={setModal} key={Math.random(10000)} />}
                <div className={cx('wrapper')}>
                    <div className={cx('profile-header')}>
                        <div className={cx('profile-contain')}>
                            <div className={cx('profile-avatar')}>
                                <Image className={cx('profile-user-avatar')} src={authUser.avatar} />
                            </div>
                            <div className={cx('profile-info')}>
                                <h1>{authUser.fullname}</h1>
                                <h2>{authUser.bio}</h2>
                                <div className={cx('profile-edit')}>
                                    <Button
                                        className={cx('profile-edit-btn')}
                                        outline
                                        small
                                        onClick={() => {
                                            setModal(true);
                                        }}
                                        leftIcon={
                                            <FontAwesomeIcon
                                                icon="fa-solid fa-pen-to-square"
                                                className={cx('profile-edit-icon')}
                                            />
                                        }
                                    >
                                        Edit profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('user-counter')}>
                            <h3>
                                <div className={cx('user-following-counter')}>
                                    <strong className={cx('user-following-counter-num')}>
                                        {authUser.followings_count}
                                    </strong>
                                    <span>Followings</span>
                                </div>
                                <div className={cx('user-following-counter')}>
                                    <strong className={cx('user-following-counter-num')}>
                                        {authUser.followers_count}
                                    </strong>
                                    <span>Followers</span>
                                </div>
                                <div className={cx('user-following-counter')}>
                                    <strong className={cx('user-following-counter-num')}>{authUser.likes_count}</strong>
                                    <span>Likes</span>
                                </div>
                            </h3>
                        </div>
                    </div>
                    <div className={cx('contain')}>
                        <div className={cx('contain-list')}>
                            <Button className={cx('contain-btn')}>Videos</Button>
                            <Button className={cx('contain-btn')}>Favorites</Button>
                            <Button className={cx('contain-btn')}>Liked</Button>
                        </div>
                        <div className={cx('contain-videos')}>
                            {authUser.video_url
                                ? authUser.video_url.map((result, index) => (
                                      <div key={index} className={cx('contain-videos-item')}>
                                          <video
                                              className={cx('video-item')}
                                              src={result.vid_url}
                                              muted
                                              playsInline
                                              reload="none"
                                              onMouseOver={(event) => event.target.play()}
                                              onMouseOut={(event) => event.target.pause()}
                                              //   autoPlay="true"
                                              loop
                                          />
                                          <p>{result.vid_des}</p>
                                      </div>
                                  ))
                                : null}
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return null;
    }
}

//     let [forYou, setForYou] = useState([]);
//     const [accountValue, setAccountValue] = useState('');
//     const [pageValue, setPageValue] = useState(2);

//     function* generatorFunc(pageValue) {
//         while (pageValue < 5) {
//             yield pageValue++;
//         }
//     }

//     async function fetchData() {
//         await fetch(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=1`)
//             .then((res) => res.json())
//             .then((res) => {
//                 setForYou(res.data);
//             });
//         for await (const num of generatorFunc(pageValue)) {
//             fetch(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=${num}`)
//                 .then((res) => res.json())
//                 .then((res) => {
//                     setForYou((forYou) => [...forYou, ...res.data]);
//                 });
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     forYou = forYou.filter((items) => items.user_id == 5889);
//     let profile = forYou.find((items) => items.user_id == 5889);

//     console.log(profile);
//     if (profile) {
//         return (
//             <div className={cx('wrapper')}>
//                 {
//                     <div className={cx('profile-header')}>
//                         <div className={cx('profile-contain')}>
//                             <div className={cx('profile-avatar')}>
//                                 <Image className={cx('profile-user-avatar')} src={profile.user.avatar} />
//                             </div>
//                             <div className={cx('profile-info')}>
//                                 <h1>{profile.user.nickname}</h1>
//                                 <h2>{profile.user.bio}</h2>
//                                 <div className={cx('profile-edit')}>
//                                     <Button
//                                         className={cx('profile-edit-btn')}
//                                         outline
//                                         small
//                                         leftIcon={
//                                             <FontAwesomeIcon
//                                                 icon="fa-solid fa-pen-to-square"
//                                                 className={cx('profile-edit-icon')}
//                                             />
//                                         }
//                                     >
//                                         Edit profile
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={cx('user-counter')}>
//                             <h3>
//                                 <div className={cx('user-following-counter')}>
//                                     <strong className={cx('user-following-counter-num')}>
//                                         {profile.user.followings_count}
//                                     </strong>
//                                     <span>Followings</span>
//                                 </div>
//                                 <div className={cx('user-following-counter')}>
//                                     <strong className={cx('user-following-counter-num')}>
//                                         {profile.user.followers_count}
//                                     </strong>
//                                     <span>Followers</span>
//                                 </div>
//                                 <div className={cx('user-following-counter')}>
//                                     <strong className={cx('user-following-counter-num')}>
//                                         {profile.user.likes_count}
//                                     </strong>
//                                     <span>Likes</span>
//                                 </div>
//                             </h3>
//                         </div>
//                     </div>
//                 }
//                 <div className={cx('contain')}>
//                     <div className={cx('contain-list')}>
//                         <Button className={cx('contain-btn')}>Videos</Button>
//                         <Button className={cx('contain-btn')}>Favorites</Button>
//                         <Button className={cx('contain-btn')}>Liked</Button>
//                     </div>
//                     <div className={cx('contain-videos')}>
//                         {forYou.map((result) => (
//                             <div className={cx('contain-videos-item')}>
//                                 <video
//                                     className={cx('video-item')}
//                                     src={result.file_url}
//                                     // muted="true"
//                                     playsInline
//                                     reload="none"
//                                     // autoPlay="true"
//                                     loop
//                                 />
//                                 <p>description</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         );
//     } else {
//         return null;
//     }
// }

export default Profile;
