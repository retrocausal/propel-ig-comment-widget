class Post {
  constructor() {
    this._pointerNext = null;
    this.id = Date.now();
  }
  set _comment( value ) {
    this.comment = value;
  }
  get _comment() {
    return this.comment;
  }
}

function postComment() {
  const comment = document.querySelector( '#root' )
    .value;
  if ( comment ) {
    const post = new Post();
    post._comment = comment;
    const content = `<div class="post-content">
                            ${post._comment}
                    </div>
                    <div class="post-actions">
                        <a href="#" id="conv_${post.id}">converse</a>
                    </div>
                    <div class="replies"></div>`;
    const article = document.createElement( 'Article' );
    article.classList.add( 'post' );
    article.innerHTML = content;
    article.setAttribute( 'id', `post_${post.id}` );
    const container = document.querySelector( '.posts' );
    container.appendChild( article );
  }
  return false;
}