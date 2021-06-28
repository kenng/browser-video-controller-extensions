// ==UserScript==
// @name         My Video Controller
// @namespace    git+ssh://git@github.com/kenng/browser-video-controller-extensions.git
// @version      1.0.0
// @description  mouse and keyboard shortcuts for video
// @author       Ken Ng
// @grant        none
// ==/UserScript==

/* jshint esversion: 6 */
import IwInit from './IwInit';

function init() {
    window.onload = function () {
        new IwInit();
    };
}
init();
