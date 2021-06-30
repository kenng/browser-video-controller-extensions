describe('Video Controller Test', () => {
    let resetAttr = {
        playbackRate: 1,
        currentTime: 3,
        volume: 0.5,
    };

    let presetRate = {
        seekRate: 1,
        playBackRate: 0.2,
        volumeRate: 0.1,
    };
    before(() => {
        cy.visit('http://localhost:8080');
    });

    beforeEach(() => {
        cy.get('video')
            .as('myvideo')
            .then(($video) => {
                for (let index = 0; index < $video.length; index++) {
                    const theVideo = $video[index] as HTMLVideoElement;

                    Object.assign(theVideo, resetAttr);
                    // console.log('playbackRate', resetAttr.playbackRate);
                    // console.log('currentTime', resetAttr.currentTime);
                    // console.log('volume', resetAttr.volume);
                }
            });
    });

    it('Able to visit local server', () => {
        cy.contains('Video 1');
    });

    it('playbackRate: able to slow down by one step', () => {
        cy.document().trigger('wheel', {
            deltaY: 5,
            altKey: true,
        } as WheelEvent);

        cy.get('@myvideo').then(($video) => {
            for (let index = 0; index < $video.length; index++) {
                const theVideo = $video[index] as HTMLVideoElement;
                console.log(
                    'new playbackRate (slower)',
                    theVideo.playbackRate,
                    resetAttr.playbackRate,
                );
                expect(theVideo.playbackRate < resetAttr.playbackRate).to.be
                    .true;
            }
        });
    });

    it('playbackRate: able to speed up by one step', () => {
        cy.document().trigger('wheel', {
            deltaY: -30,
            altKey: true,
        } as WheelEvent);

        cy.get('@myvideo').then(($video) => {
            for (let index = 0; index < $video.length; index++) {
                const theVideo = $video[index] as HTMLVideoElement;
                console.log(
                    'new playbackRate (faster)',
                    theVideo.playbackRate,
                    resetAttr.playbackRate,
                );
                expect(theVideo.playbackRate > resetAttr.playbackRate).to.be
                    .true;
            }
        });
    });

    it('playbackRate: minimum value never less than zero', () => {
        for (
            let i = 0;
            i < resetAttr.playbackRate / presetRate.playBackRate + 2;
            i++
        ) {
            cy.document().trigger('wheel', {
                deltaY: 5,
                altKey: true,
            } as WheelEvent);
        }

        cy.get('@myvideo').then(($video) => {
            for (let index = 0; index < $video.length; index++) {
                const theVideo = $video[index] as HTMLVideoElement;
                console.log(
                    'new playbackRate (minimum)',
                    theVideo.playbackRate,
                );
                expect(theVideo.playbackRate > 0).to.be.true;
            }
        });
    });

    it('CurrentTime: able to go forward by one seekRate', () => {
        cy.document().trigger('wheel', {
            deltaY: -5,
            shiftKey: true,
        } as WheelEvent);

        cy.get('@myvideo').then(($video) => {
            for (let index = 0; index < $video.length; index++) {
                const theVideo = $video[index] as HTMLVideoElement;
                console.log(
                    'new currentTime',
                    theVideo.currentTime,
                    resetAttr.currentTime,
                );
                expect(theVideo.currentTime > resetAttr.currentTime).to.be.true;
            }
        });
    });

    it('CurrentTime: able to go backward to by one seekRate', () => {
        cy.document().trigger('wheel', {
            deltaY: 5,
            shiftKey: true,
        } as WheelEvent);

        cy.get('@myvideo').then(($video) => {
            for (let index = 0; index < $video.length; index++) {
                const theVideo = $video[index] as HTMLVideoElement;
                console.log(
                    'new currentTime',
                    theVideo.currentTime,
                    resetAttr.currentTime,
                );
                expect(theVideo.currentTime < resetAttr.currentTime).to.be.true;
            }
        });
    });

    it('CurrentTime: minimum value is zero', () => {
        // act
        for (let i = 0; i < resetAttr.volume / presetRate.volumeRate + 2; i++) {
            cy.document().trigger('wheel', {
                deltaY: 5,
                shiftKey: true,
            } as WheelEvent);
        }

        // test
        cy.get('@myvideo').then(($video) => {
            for (let index = 0; index < $video.length; index++) {
                const theVideo = $video[index] as HTMLVideoElement;
                console.log('new currentTime', theVideo.currentTime);
                expect(theVideo.currentTime === 0).to.be.true;
            }
        });
    });

    it('Volume: able to reduce by one step', () => {
        // act
        cy.document().trigger('wheel', {
            deltaY: 5,
            shiftKey: true,
            altKey: true,
        } as WheelEvent);

        // test
        cy.get('@myvideo').then(($video) => {
            for (let index = 0; index < $video.length; index++) {
                const theVideo = $video[index] as HTMLVideoElement;
                console.log(
                    'new volume (reduced)',
                    theVideo.volume,
                    resetAttr.volume,
                );
                expect(theVideo.volume < resetAttr.volume).to.be.true;
            }
        });
    });

    it('Volume: min value is 0', () => {
        // act
        for (
            let index = 0;
            index < resetAttr.volume / presetRate.volumeRate + 2;
            index++
        ) {
            cy.document().trigger('wheel', {
                deltaY: 5,
                shiftKey: true,
                altKey: true,
            } as WheelEvent);
        }

        // test
        cy.get('@myvideo').then(($video) => {
            for (let index = 0; index < $video.length; index++) {
                const theVideo = $video[index] as HTMLVideoElement;
                console.log('new volume (min)', theVideo.volume);
                expect(theVideo.volume === 0).to.be.true;
            }
        });
    });

    it('Volume: able to increment by one step', () => {
        // act
        cy.document().trigger('wheel', {
            deltaY: -5,
            shiftKey: true,
            altKey: true,
        } as WheelEvent);

        // test
        cy.get('@myvideo').then(($video) => {
            for (let index = 0; index < $video.length; index++) {
                const theVideo = $video[index] as HTMLVideoElement;
                console.log(
                    'new volume (increased)',
                    theVideo.volume,
                    resetAttr.volume,
                );
                expect(theVideo.volume > resetAttr.volume).to.be.true;
            }
        });
    });

    it('Volume: max value is 1', () => {
        // act
        for (
            let index = 0;
            index < resetAttr.volume / presetRate.volumeRate + 2;
            index++
        ) {
            cy.document().trigger('wheel', {
                deltaY: -5,
                shiftKey: true,
                altKey: true,
            } as WheelEvent);
        }

        // test
        cy.get('@myvideo').then(($video) => {
            for (let index = 0; index < $video.length; index++) {
                const theVideo = $video[index] as HTMLVideoElement;
                console.log('new volume (minimum)', theVideo.volume);
                expect(theVideo.volume === 1).to.be.true;
            }
        });
    });
});
