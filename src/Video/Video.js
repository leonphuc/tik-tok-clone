/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import { VideoScroll } from 'react-video-scroll';
// import testVideo from '../assets/videos/testVideo.mp4';
// import testVideo1 from '../assets/videos/testVideo1.mp4';
// import testVideo2 from '../assets/videos/testVideo2.mp4';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { forwardRef, useImperativeHandle, useRef, useState, useMemo, useEffect } from 'react';
import videoScroll from './autoPlayVideo';
// import { useOnScreen } from './useElementOnScreen';
import { MediaPlayer, MediaOutlet, MediaVolumeSlider, MediaMuteButton } from '@vidstack/react';
import Icons, { MutedIcon, UnmutedIcon } from '~/components/Icons/Icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
const cx = classNames.bind(styles);

function Video(props, ref) {
    const videoRef = useRef();

    const [isplaying, setIsPlaying] = useState(true);
    const [ismuted, setMuted] = useState(true);

    const handleVideo = () => {
        if (isplaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePlay = () => {
        videoRef.current.play();
        setIsPlaying(true);
    };
    const handlePause = () => {
        videoRef.current.pause();
        setIsPlaying(false);
    };

    // const checkMute = () => {
    //     console.log(videoRef.current);
    // };

    const handleMuted = () => {
        setMuted(false);
    };

    const handleUnmuted = () => {
        setMuted(true);
    };

    // const toggleVideo = (e) => {
    //     setIsPlaying(e);
    // };

    useImperativeHandle(ref, () => ({
        play() {
            videoRef.current.play();
            setIsPlaying(true);
        },
        pause() {
            videoRef.current.pause();
            setIsPlaying(false);
        },
    }));

    return (
        <div className={cx('video-wrap')}>
            <div className={cx('video')}>
                <video
                    ref={videoRef}
                    onClick={handleVideo}
                    className={cx('video-item')}
                    src={props.resourceVideo}
                    key={props.data}
                    muted={ismuted}
                    playsInline
                    reload="none"
                    loop
                />
                <div className={cx('video-btn-play')}>
                    {!isplaying ? (
                        <button onClick={handlePlay} className={cx('video-btn--play')}>
                            <FontAwesomeIcon icon="fa-solid fa-play" />
                        </button>
                    ) : null}

                    {isplaying ? (
                        <button onClick={handlePause} className={cx('video-btn--pause')}>
                            <FontAwesomeIcon icon="fa-solid fa-pause" />
                        </button>
                    ) : null}
                </div>

                <div className={cx('video-btn-volume')}>
                    {!ismuted ? (
                        <button onClick={handleUnmuted} className={cx('video-btn--mute')}>
                            <UnmutedIcon />
                        </button>
                    ) : null}
                    {ismuted ? (
                        <button onClick={handleMuted} className={cx('video-btn--mute')}>
                            <MutedIcon />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );

    // return (
    //     <div className={cx('video-wrap')}>
    //         <div className={cx('video')}>
    //             <MediaPlayer ref={videoRef} src={props.resourceVideo} className={cx('video-item')} loop muted>
    //                 <MediaOutlet onClick={handleVideo} className={cx('video-item-0')} />
    //                 <div className={cx('video-test')}>
    //                     <MediaVolumeSlider aria-orientation="vertical" className={cx('video-item-con2')} />
    //                     <MediaMuteButton className={cx('video-item-con1')} />
    //                 </div>
    //             </MediaPlayer>
    //         </div>
    //     </div>
    // );
}

export default forwardRef(Video);
