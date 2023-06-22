class App {
    switcher;
    data = null;

    constructor() {
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch('/data/data.json');
            this.data = await response.json();
            this.switcher = new Switcher(this, this.data.videos);
            this.createVideoSection(this.data.videos[this.switcher.default]);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    createVideoSection(video) {
        const section = document.createElement('section');
        section.className = 'video-section';

        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';

        const mainVideoWrapper = document.createElement('div');
        mainVideoWrapper.className = 'video-wrapper';

        const mainVideo = document.createElement('iframe');
        mainVideo.className = 'video-box';
        mainVideo.src = video.src;
        mainVideo.setAttribute('frameborder', '0');
        mainVideo.setAttribute('allowfullscreen', 'true');
        mainVideoWrapper.appendChild(mainVideo);

        const videoTitle = document.createElement('span');
        videoTitle.className = 'video-title';
        videoTitle.textContent = video.title;

        const videoDetails = document.createElement('div');
        videoDetails.className = 'video-details';

        const videoTime = document.createElement('span');
        videoTime.className = 'video-time';
        videoTime.textContent = video.time;
        videoTime.innerHTML += '<i class="bi bi-clock"></i>';
        videoDetails.appendChild(videoTime);

        const videoLikes = document.createElement('span');
        videoLikes.className = 'video-likes';
        videoLikes.textContent = video.likes + ' ';
        videoLikes.innerHTML += '<i class="bi bi-chat-left-heart-fill"></i>';
        videoDetails.appendChild(videoLikes);

        const shareButton = document.createElement('button');
        shareButton.className = 'share-button';
        shareButton.textContent = 'Share ';
        shareButton.innerHTML += '<i class="bi bi-share-fill"></i>';
        videoDetails.appendChild(shareButton);

        const relatedVideosSection = document.createElement('div');
        relatedVideosSection.className = 'related-videos';

        const relatedVideosTitle = document.createElement('h2');
        relatedVideosTitle.className = 'related-videos-title';
        relatedVideosTitle.textContent = 'Related Videos';
        relatedVideosSection.appendChild(relatedVideosTitle);

        const miniVideosList = document.createElement('ul');
        miniVideosList.className = 'mini-videos';

        this.data.videos.forEach((relatedVideo) => {
            if (relatedVideo !== video) {
                const miniVideoItem = document.createElement('li');
                miniVideoItem.className = 'mini-video-item';

                const miniVideoLink = document.createElement('a');
                miniVideoLink.href = '#';

                const miniVideoWrapper = document.createElement('div');
                miniVideoWrapper.className = 'video-wrapper';

                const miniVideo = document.createElement('iframe');
                miniVideo.className = 'video-thumb';
                miniVideo.src = relatedVideo.src;
                miniVideo.setAttribute('frameborder', '0');
                miniVideo.setAttribute('allowfullscreen', 'true');
                miniVideoWrapper.appendChild(miniVideo);

                miniVideoLink.appendChild(miniVideoWrapper);
                miniVideoItem.appendChild(miniVideoLink);
                miniVideosList.appendChild(miniVideoItem);
            }
        });

        relatedVideosSection.appendChild(miniVideosList);

        videoContainer.appendChild(mainVideoWrapper);
        videoContainer.appendChild(videoTitle);
        videoContainer.appendChild(videoDetails);
        videoContainer.appendChild(relatedVideosSection);

        section.appendChild(videoContainer);

        document.body.appendChild(section);
    }
}

class Switcher {
    yubtub;
    cleaner;
    app;
    default = 0;

    constructor(app, videos) {
        this.app = app;
        this.videos = videos;
        this.yubtub = new Yubtub(this.app, this.videos[this.default]);
        this.cleaner = new Cleaner();
    }

    switch(video) {
        this.cleaner.clean('.video-section');
        this.yubtub = new Yubtub(this.app, video);
    }
}

class Cleaner {
    clean(whereToClean) {
        const container = document.querySelector(whereToClean);
        if (container) {
            container.innerHTML = '';
        }
    }
}

class Yubtub {
    aside;
    renderer;
    app;

    constructor(app, data) {
        this.app = app;
        this.renderer = new Renderer();
        this.aside = new Aside(this, data);
    }
}

class Renderer {
    render(whereToRender, whatToRender) {
        const container = document.querySelector(whereToRender);
        if (container) {
            container.appendChild(whatToRender);
        }
    }
}

class Aside {
    yubtub;
    nextVideo;
    htmlElement;

    constructor(yubtub, data) {
        this.yubtub = yubtub;
        this.htmlElement = document.createElement('aside');
        this.yubtub.renderer.render('.related-videos', this.htmlElement);
        this.nextVideo = new NextVideo(this, data);
    }
}

class NextVideo {
    aside;
    htmlElement;

    constructor(aside, data) {
        this.aside = aside;
        this.data = data;
        this.htmlElement = document.createElement('video');
        this.htmlElement.src = this.data.src;
        this.aside.yubtub.renderer.render('aside', this.htmlElement);
        this.htmlElement.addEventListener('click', this.videoClicked);
    }

    videoClicked = () => {
        this.aside.yubtub.app.switcher.switch(this.data);
    };
}

const app = new App();
