import IwVideo from './IwVideo';

export default class IwInit {
    iwVideos: Array<IwVideo> = [];

    constructor() {
        this.getVideo(document);
        window.addEventListener('wheel', this.onMouseWheel.bind(this), {
            passive: false,
        });
    }
    getVideo(docu: Document) {
        const videos = docu.getElementsByTagName('video');
        for (let i = 0; i < videos.length; i++) {
            this.iwVideos.push(new IwVideo(videos[i]));
        }
    }

    // getIframe();

    onMouseWheel(ev: WheelEvent) {
        for (const video of this.iwVideos) {
            video.controller(ev);
        }
    }
}
