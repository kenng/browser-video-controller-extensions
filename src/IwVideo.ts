export default class IwVideo {
    video: HTMLVideoElement;
    seekRate: number;
    playbackRate: number;
    showDebugLog: boolean;

    constructor(
        video: HTMLVideoElement,
        showDebugLog = true,
        seekRate = 1,
        playBackRate = 1,
    ) {
        this.video = video;
        this.seekRate = seekRate;
        this.playbackRate = playBackRate;
        this.showDebugLog = showDebugLog;
    }

    controller(ev: WheelEvent) {
        if (ev.shiftKey) {
            if (ev.altKey) {
                this.setVolume(ev);
            } else {
                this.setCurrentTime(ev);
            }
        } else if (ev.altKey) {
            if (ev.deltaY < 0) {
                if (this.video.playbackRate > 1)
                    this.video.playbackRate -= this.playbackRate / 4;
            } else {
                if (this.video.playbackRate < 10)
                    this.video.playbackRate += this.playbackRate / 4;
            }

            ev.preventDefault();
            console.log(this.video.playbackRate);
        }
    }

    private setCurrentTime(ev: WheelEvent) {
        if (ev.deltaY < 0) {
            this.video.currentTime -= this.seekRate;
        } else {
            if (!this.video.ended) this.video.currentTime += this.seekRate;
        }

        ev.preventDefault();
        console.log(this.video.currentTime);
    }

    private setVolume(ev: WheelEvent) {
        if (ev.deltaY < 0) {
            if (this.video.volume > 0) this.video.volume -= this.seekRate;
        } else {
            if (this.video.volume < 100) this.video.volume += this.seekRate;
        }

        console.log(this.video.volume);
    }
}
