// ==UserScript==
// @name         Universal Video Controller
// @namespace    git+ssh://git@github.com/kenng/browser-video-controller-extensions.git
// @version      1.0.0
// @description  mouse and keyboard shortcuts for video
// @author       Ken Ng
// @grant        none
// ==/UserScript==

/* jshint esversion: 6 */
import IwVideo from './IwVideo';

const videos = document.getElementsByTagName('video');
const iwVideos: Array<IwVideo> = [];
for (let i = 0; i < videos.length; i++) {
    iwVideos.push(new IwVideo(videos[i]));
}

function onMouseWheel(ev) {
    for (const video of iwVideos) {
        video.controller(ev);
    }
}

document.addEventListener('mousewheel', onMouseWheel.bind(this), {
    passive: false,
});
