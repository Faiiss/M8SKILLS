  // This class represents the main application. It initializes the app, loads data, creates the main video section, sets up event listeners, and handles related videos.
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
      const main = new MainVideoSection(videos, comments);
      return main.element;
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
      const commentItem = new CommentItem(author, comment);
      commentsList.appendChild(commentItem.element);
    }
  
    setupRelatedVideos(videos) {
      const miniVideoItems = Array.from(this.container.querySelectorAll('.mini-video-item'));
  
      miniVideoItems.forEach((miniVideoItem, index) => {
        miniVideoItem.addEventListener('click', () => {
          const videoBox = this.container.querySelector('.video-box');
          const videoTitle = this.container.querySelector('.video-title');
          const videoTime = this.container.querySelector('.video-time');
          const videoLikes = this.container.querySelector('.video-likes');
  
          videoBox.src = videos[index].src;
          videoTitle.textContent = videos[index].title;
          videoTime.textContent = videos[index].time;
          videoLikes.textContent = videos[index].likes;
  
          miniVideoItems.forEach((item) => {
            item.classList.remove('active');
          });
          miniVideoItem.classList.add('active');
        });
      });
    }
  } 
  //This class represents the main video section of the application. It creates the main video player, video details, and related videos section.
  class MainVideoSection {
    constructor(videos, comments) {
      this.element = this.createMainVideoSection(videos, comments);
    }
  
    createMainVideoSection(videos, comments) {
      const main = document.createElement('main');
      main.className = 'main-video-section';
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
      videoBox.setAttribute('autoplay', 'true');
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
      videoLikes.textContent = videos[0].likes;
  
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
  
      const relatedVideos = new RelatedVideosSection(videos);
  
      const commentsSection = new CommentsSection(comments);
  
      videoWrapper.append(commentsSection.element);
      videoContainer.append(videoWrapper, relatedVideos.element);
      videoSection.append(videoContainer);
      main.appendChild(videoSection);
  
      return main;
    }
  }
  //This class represents the related videos section in the application. It creates a list of mini video items based on the provided video data.
  class RelatedVideosSection {
    constructor(videos) {
      this.element = this.createRelatedVideosSection(videos);
    }
  
    createRelatedVideosSection(videos) {
      const relatedVideos = document.createElement('div');
      relatedVideos.className = 'related-videos';
  
      const relatedVideosTitle = document.createElement('h2');
      relatedVideosTitle.className = 'related-videos-title';
      relatedVideosTitle.textContent = 'Related Videos';
  
      const miniVideos = document.createElement('ul');
      miniVideos.className = 'mini-videos';
  
      const miniVideoItems = videos.map((video) => {
        const miniVideoItem = new MiniVideoItem(video);
        return miniVideoItem.element;
      });
  
      miniVideos.append(...miniVideoItems);
      relatedVideos.append(relatedVideosTitle, miniVideos);
  
      return relatedVideos;
    }
  }
  //This class represents each mini video item in the related videos section. It creates a thumbnail image link for a video.
  class MiniVideoItem {
    constructor(video) {
      this.element = this.createMiniVideoItem(video);
    }
  
    createMiniVideoItem(video) {
      const miniVideoItem = document.createElement('li');
      miniVideoItem.className = 'mini-video-item';
  
      const miniVideoLink = document.createElement('a');
      miniVideoLink.href = '#';
  
      const miniVideoWrapper = document.createElement('div');
      miniVideoWrapper.className = 'video-wrapper';
  
      const miniVideoThumb = document.createElement('img');
      miniVideoThumb.className = 'video-thumb';
      miniVideoThumb.src = video.thumbnail;
  
      miniVideoWrapper.appendChild(miniVideoThumb);
      miniVideoLink.appendChild(miniVideoWrapper);
      miniVideoItem.appendChild(miniVideoLink);
  
      return miniVideoItem;
    }
  }
  //This class represents the comments section in the application. It creates a list of comment items based on the provided comment data.
  class CommentsSection {
    constructor(comments) {
      this.element = this.createCommentsSection(comments);
    }
  
    createCommentsSection(comments) {
      const commentsSection = document.createElement('div');
      commentsSection.className = 'comments-section';
  
      const commentsSectionTitle = document.createElement('h2');
      commentsSectionTitle.textContent = 'Comment Section';
  
      const commentsList = document.createElement('ul');
      commentsList.className = 'comments-list';
  
      const commentItems = comments.map((comment) => {
        const commentItem = new CommentItem(comment.author, comment.comment);
        return commentItem.element;
      });
  
      commentsList.append(...commentItems);
  
      const writeCommentTitle = document.createElement('h2');
      writeCommentTitle.textContent = 'Write a comment';
  
      const commentForm = new CommentForm();
      
      commentsSection.append(commentsSectionTitle, commentsList, writeCommentTitle, commentForm.element);
  
      return commentsSection;
    }
  }
  //This class represents each comment item in the comments section. It creates a comment with author details and comment text.
  class CommentItem {
    constructor(author, comment) {
      this.element = this.createCommentItem(author, comment);
    }
  
    createCommentItem(author, comment) {
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
  
      return commentItem;
    }
  }
  //This class represents the comment form section. It creates a form for users to submit their comments.
  class CommentForm {
    constructor() {
      this.element = this.createCommentForm();
      this.setupSubmitListener();
    }
  
    createCommentForm() {
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
  
      return commentForm;
    }
  
    setupSubmitListener() {
      const commentForm = this.element;
      const commentsList = document.querySelector('.comments-list');
  
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
      const commentItem = new CommentItem(author, comment);
      commentsList.appendChild(commentItem.element);
    }
  }
  //This class represents the header section of the application. It creates a navigation bar with a Yubtub brand link and navigation links.
  class YubtubHeader {
    constructor() {
      this.element = this.createHeader();
    }
  
    createHeader() {
      const header = document.createElement('header');
      header.className = 'yubtub-header';
  
      const nav = document.createElement('nav');
      nav.className = 'navbar navbar-expand-lg navbar-dark';
  
      const brandLink = document.createElement('a');
      brandLink.className = 'navbar-brand';
      brandLink.href = '#';
      brandLink.innerHTML = 'Yubtub <i class="bi bi-collection-play-fill"></i>';
  
      const togglerButton = document.createElement('button');
      togglerButton.className = 'navbar-toggler';
      togglerButton.type = 'button';
      togglerButton.setAttribute('data-toggle', 'collapse');
      togglerButton.setAttribute('data-target', '#navbarNav');
      togglerButton.setAttribute('aria-controls', 'navbarNav');
      togglerButton.setAttribute('aria-expanded', 'false');
      togglerButton.setAttribute('aria-label', 'Toggle navigation');
  
      const togglerIcon = document.createElement('span');
      togglerIcon.className = 'navbar-toggler-icon';
  
      togglerButton.appendChild(togglerIcon);
  
      const collapseDiv = document.createElement('div');
      collapseDiv.className = 'collapse navbar-collapse';
      collapseDiv.id = 'navbarNav';
  
      const navList = document.createElement('ul');
      navList.className = 'navbar-nav ml-auto';
  
      const navItems = [
        { label: 'Videos', href: '#' },
        { label: 'Categories', href: '#' },
        { label: 'Contact', href: 'https://www.instagram.com/faissdesigns/' },
      ];
  
      navItems.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.className = 'nav-item';
  
        const link = document.createElement('a');
        link.className = 'nav-link';
        link.href = item.href;
        link.textContent = item.label;
  
        listItem.appendChild(link);
        navList.appendChild(listItem);
      });
  
      collapseDiv.appendChild(navList);
      nav.appendChild(brandLink);
      nav.appendChild(togglerButton);
      nav.appendChild(collapseDiv);
      header.appendChild(nav);
  
      return header;
    }
  }
  
 // Makes the header and appends it into the document
  const header = new YubtubHeader(); 
  const headerElement = header.element;
  
  const container = document.getElementById('app');
  container.appendChild(headerElement);
   // creates an instance of the app and initializes the application
  const app = new YubtubApp();
  app.initialize();
  