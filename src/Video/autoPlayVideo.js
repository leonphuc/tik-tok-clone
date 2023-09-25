window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {
    if (document.querySelectorAll('video').length > 0) {
        var windowHeight = window.innerHeight,
            videoEl = document.querySelectorAll('video');
        for (var i = 0; i < videoEl.length; i++) {
            var thisVideoEl = videoEl[i],
                videoHeight = thisVideoEl.clientHeight,
                videoClientRect = thisVideoEl.getBoundingClientRect().top;

            if (videoClientRect <= windowHeight - videoHeight * 0.5 && videoClientRect >= 0 - videoHeight * 0.5) {
                // thisVideoEl.play();
                // thisVideoEl.muted = false;
            } else {
                thisVideoEl.pause();
            }
        }
    }
}

// window.addEventListener('load', contentLayoutScroll);
// window.addEventListener('scroll', contentLayoutScroll);
// function contentLayoutScroll() {
//     if (document.getElementsByClassName('content-layout').length > 0) {
//         var windowHeight = window.innerHeight,
//             videoEl = document.querySelectorAll('video');
//         for (var i = 0; i < videoEl.length; i++) {
//             var thisVideoEl = videoEl[i],
//                 videoHeight = thisVideoEl.clientHeight,
//                 videoClientRect = thisVideoEl.getBoundingClientRect().top;

//             if (videoClientRect <= windowHeight - videoHeight * 0.5 && videoClientRect >= 0 - videoHeight * 0.5) {
//                 thisVideoEl.play();
//                 // thisVideoEl.muted = false;
//             } else {
//                 thisVideoEl.pause();
//             }
//         }
//     }
// }

// export default contentLayoutScroll;
