class YubtubApp {
    constructor() {
      this.container = document.getElementById('app');
    }
  
    async initialize() {
      try {
        const data = await this.loadData();
        const main = this.createMain(data.videos, data.comments);
        this.container.appendChild(main);
        this.setupShareButton();
        this.setupCommentForm();
        this.setupRelatedVideos(data.videos);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  
    async loadData() {
      try {
        const response = await fetch('/data/data.json');
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to load data');
      }
    }
  
    createMain(videos, comments) {
        const main = document.createElement('main');
      
        const videoSection = document.createElement('section');
        videoSection.className = 'video-section';
      
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
      
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-wrapper';
      
        const videoBoxWrapper = document.createElement('div');
        videoBoxWrapper.className = 'video-box-wrapper';
      
        const videoBox = document.createElement('iframe');
        videoBox.className = 'video-box';
        videoBox.src = videos[0].src;
        videoBox.setAttribute('frameborder', '0');
        videoBox.setAttribute('allowfullscreen', 'true');
      
        videoBoxWrapper.appendChild(videoBox);
      
        const videoTitle = document.createElement('span');
        videoTitle.className = 'video-title';
        videoTitle.textContent = videos[0].title;
      
        const videoDetails = document.createElement('div');
        videoDetails.className = 'video-details';
      
        const videoTime = document.createElement('span');
        videoTime.className = 'video-time';
        videoTime.textContent = videos[0].time;
      
        const videoTimeIcon = document.createElement('i');
        videoTimeIcon.className = 'bi bi-clock';
      
        videoTime.appendChild(videoTimeIcon);
      
        const videoLikes = document.createElement('span');
        videoLikes.className = 'video-likes';
        videoLikes.textContent = videos[0].likes + ' likes';
      
        const videoLikesIcon = document.createElement('i');
        videoLikesIcon.className = 'bi bi-chat-left-heart-fill';
      
        videoLikes.appendChild(videoLikesIcon);
      
        const shareButton = document.createElement('button');
        shareButton.className = 'share-button';
        shareButton.textContent = 'Share';
      
        const shareButtonIcon = document.createElement('i');
        shareButtonIcon.className = 'bi bi-share-fill';
      
        shareButton.appendChild(shareButtonIcon);
      
        videoDetails.append(videoTime, videoLikes, shareButton);
        videoWrapper.append(videoBoxWrapper, videoTitle, videoDetails);
      
        const relatedVideos = document.createElement('div');
        relatedVideos.className = 'related-videos';
      
        const relatedVideosTitle = document.createElement('h2');
        relatedVideosTitle.className = 'related-videos-title';
        relatedVideosTitle.textContent = 'Related Videos';
      
        const miniVideos = document.createElement('ul');
        miniVideos.className = 'mini-videos';
      
        const miniVideoItems = [];
        for (let i = 1; i < videos.length; i++) {
          const miniVideoItem = document.createElement('li');
          miniVideoItem.className = 'mini-video-item';
      
          const miniVideoLink = document.createElement('a');
          miniVideoLink.href = '#';
      
          const miniVideoWrapper = document.createElement('div');
          miniVideoWrapper.className = 'video-wrapper';
      
          const miniVideoThumb = document.createElement('img');
          miniVideoThumb.className = 'video-thumb';
          miniVideoThumb.src = videos[i].thumbnail;
      
          miniVideoWrapper.appendChild(miniVideoThumb);
          miniVideoLink.appendChild(miniVideoWrapper);
          miniVideoItem.appendChild(miniVideoLink);
          miniVideoItems.push(miniVideoItem);
        }
      
        miniVideos.append(...miniVideoItems);
        relatedVideos.append(relatedVideosTitle, miniVideos);
      
        videoContainer.append(videoWrapper, relatedVideos);
      
        const commentsSection = document.createElement('div');
        commentsSection.className = 'comments-section';
      
        const commentsSectionTitle = document.createElement('h2');
        commentsSectionTitle.textContent = 'Comment Section';
      
        const commentsList = document.createElement('ul');
        commentsList.className = 'comments-list';
      
        const commentItems = [];
        for (const comment of comments) {
          const commentItem = document.createElement('li');
          commentItem.className = 'comment-item';
      
          const commentDetails = document.createElement('div');
          commentDetails.className = 'comment-details';
      
          const commentAuthor = document.createElement('span');
          commentAuthor.className = 'comment-author';
      
          const commentProfileIcon = document.createElement('i');
          commentProfileIcon.className = `bi ${comment.icon}`;
      
          const commentAuthorName = document.createElement('span');
          commentAuthorName.className = 'comment-author-name';
          commentAuthorName.textContent = comment.author;
      
          commentAuthor.append(commentProfileIcon, commentAuthorName);
          commentDetails.append(commentAuthor);
      
          const commentText = document.createElement('span');
          commentText.className = 'comment-text';
          commentText.textContent = comment.comment;
      
          const commentTime = document.createElement('span');
          commentTime.className = 'comment-time';
          commentTime.textContent = comment.timePosted;
      
          commentText.append(commentTime);
          commentDetails.append(commentText);
      
          commentItem.append(commentDetails);
          commentItems.push(commentItem);
        }
      
        commentsList.append(...commentItems);
      
        const writeCommentTitle = document.createElement('h2');
        writeCommentTitle.textContent = 'Write a comment';
      
        const commentForm = document.createElement('form');
        commentForm.className = 'comment-form';
        commentForm.action = '#';
        commentForm.method = 'post';
      
        const nameInput = document.createElement('input');
        nameInput.className = 'comment-form-input';
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.placeholder = 'Your Name';
        nameInput.required = true;
      
        const commentTextarea = document.createElement('textarea');
        commentTextarea.className = 'comment-form-textarea';
        commentTextarea.name = 'comment';
        commentTextarea.placeholder = 'Write your comment';
        commentTextarea.required = true;
      
        const submitButton = document.createElement('button');
        submitButton.className = 'comment-form-button';
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
      
        commentForm.append(nameInput, commentTextarea, submitButton);
        commentsSection.append(commentsSectionTitle, commentsList, writeCommentTitle, commentForm);
      
        videoSection.append(videoContainer, commentsSection);
        main.appendChild(videoSection);
      
        return main;
      }
      
  
    setupShareButton() {
      const shareButton = this.container.querySelector('.share-button');
      shareButton.addEventListener('click', () => {
        console.log('Share button clicked');
      });
    }
  
    setupCommentForm() {
      const commentForm = this.container.querySelector('.comment-form');
      const commentsList = this.container.querySelector('.comments-list');
  
      commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const nameInput = commentForm.querySelector('.comment-form-input');
        const commentTextarea = commentForm.querySelector('.comment-form-textarea');
  
        const name = nameInput.value;
        const comment = commentTextarea.value;
  
        this.addComment(name, comment, commentsList);
  
        nameInput.value = '';
        commentTextarea.value = '';
      });
    }
  
    addComment(author, comment, commentsList) {
      const commentItem = document.createElement('li');
      commentItem.className = 'comment-item';
  
      const commentDetails = document.createElement('div');
      commentDetails.className = 'comment-details';
  
      const commentAuthor = document.createElement('span');
      commentAuthor.className = 'comment-author';
  
      const commentProfileIcon = document.createElement('i');
      commentProfileIcon.className = 'bi bi-person comment-pf';
  
      const commentAuthorName = document.createElement('span');
      commentAuthorName.className = 'comment-author-name';
      commentAuthorName.textContent = author;
  
      commentAuthor.append(commentProfileIcon, commentAuthorName);
      commentDetails.append(commentAuthor);
  
      const commentText = document.createElement('span');
      commentText.className = 'comment-text';
      commentText.textContent = comment;
  
      const commentTime = document.createElement('span');
      commentTime.className = 'comment-time';
      commentTime.textContent = 'Just now';
  
      commentText.append(commentTime);
      commentDetails.append(commentText);
  
      commentItem.append(commentDetails);
      commentsList.appendChild(commentItem);
    }
  
    setupRelatedVideos(videos) {
      const miniVideoItems = Array.from(this.container.querySelectorAll('.mini-video-item'));
  
      miniVideoItems.forEach((miniVideoItem, index) => {
        miniVideoItem.addEventListener('click', () => {
          const videoBox = this.container.querySelector('.video-box');
          const videoTitle = this.container.querySelector('.video-title');
          const videoTime = this.container.querySelector('.video-time');
          const videoLikes = this.container.querySelector('.video-likes');
  
          videoBox.src = videos[index + 1].src;
          videoTitle.textContent = videos[index + 1].title;
          videoTime.textContent = videos[index + 1].time;
          videoLikes.textContent = videos[index + 1].likes + ' likes';
  
          miniVideoItems.forEach((item) => {
            item.classList.remove('active');
          });
          miniVideoItem.classList.add('active');
        });
      });
    }
  }
  

  const app = new YubtubApp();
  app.initialize();
  