import IwConsole from './IwConsole';

export default class IwVideo {
    readonly maxPlaybackRate = 6.0;
    video: HTMLVideoElement;
    seekRate: number;
    playbackRate: number;
    volumeRate: number;

    constructor(
        video: HTMLVideoElement,
        seekRate = 1,
        playBackRate = 1 / 5,
        volumeRate = 0.1,
    ) {
        this.video = video;
        this.seekRate = seekRate;
        this.playbackRate = playBackRate;
        this.volumeRate = volumeRate;
    }

    controller(ev: WheelEvent) {
        if (ev.shiftKey) {
            if (ev.altKey) {
                this.setVolume(ev);
            } else {
                this.setCurrentTime(ev);
            }
        } else if (ev.altKey) {
            this.setPlayRate(ev);
        }
    }

    private decimal(val: number): number {
        return Math.round(val * 100) / 100;
    }

    // default: alt + mousewheel to control video's play rate
    private setPlayRate(ev: WheelEvent) {
        if (ev.deltaY > 0) {
            const newPlayBackRate = this.video.playbackRate - this.playbackRate;
            if (newPlayBackRate > 0.1) {
                this.video.playbackRate = this.decimal(newPlayBackRate);
            } else {
                this.video.playbackRate = 0.1;
            }
        } else {
            const newPlayBackRate = this.video.playbackRate + this.playbackRate;
            if (newPlayBackRate < this.maxPlaybackRate) {
                this.video.playbackRate = this.decimal(newPlayBackRate);
            } else {
                this.video.playbackRate = this.maxPlaybackRate;
            }
        }

        ev.preventDefault();
        IwConsole.log('playRate', this.video.playbackRate);
    }

    // default: shift + mousewheel to control video's current time
    private setCurrentTime(ev: WheelEvent) {
        if (ev.deltaY > 0) {
            const newSeekRate = this.video.currentTime - this.seekRate;
            if (newSeekRate > 0) {
                this.video.currentTime = this.decimal(newSeekRate);
            } else {
                this.video.currentTime = 0;
            }
        } else {
            const newSeekRate = this.video.currentTime + this.seekRate;
            if (newSeekRate < this.video.duration) {
                this.video.currentTime = this.decimal(newSeekRate);
            }
        }

        ev.preventDefault();
        IwConsole.log('currentTime', this.video.currentTime);
    }

    // default: ctrl + alt + mousewheel to control volume
    private setVolume(ev: WheelEvent) {
        if (ev.deltaY > 0) {
            const newVolume = this.video.volume - this.volumeRate;
            if (newVolume > 0) {
                this.video.volume = this.decimal(newVolume);
            } else {
                this.video.volume = 0;
            }
        } else {
            const newVolume = this.video.volume + this.volumeRate;
            if (newVolume < 1) {
                this.video.volume = this.decimal(newVolume);
            } else {
                this.video.volume = 1;
            }
        }

        ev.preventDefault();
        IwConsole.log('volume', this.video.volume);
    }
}
