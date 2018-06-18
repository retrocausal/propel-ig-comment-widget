class Post {
  constructor() {
    this._pointerNext = null;
    this.id = null;
  }
  set _comment( value ) {
    this.comment = value;
  }
  get _comment() {
    return this.comment;
  }
}
class Thread {
  constructor() {
    this.head = null;
  }
  add( post ) {
    if ( !this.head ) {
      this.head = post;
    } else {
      let current = this.head;
      while ( current._pointerNext ) {
        current = current._pointerNext;
      }
      current._pointerNext = post;
    }
  }
}

function postComment() {
  const comment = document.querySelector( '#root' )
    .value;
  if ( comment ) {
    const id = Date.now();
    const container = document.querySelector( '.posts' );
    const article = document.createElement( 'Article' );
    const content = `<div class="post-content">${comment}</div>
                     <div class="post-actions">
                        <a href="#conv_${id}" id="conv_${id}">converse</a>
                     </div>
                     <div class="replies"></div>
                     <div class="reply">
                          <textarea class="reply-text" name="in-thread-comment" id="in-thread-comment"></textarea>
                        <button class="reply-button" type="button" name="button" id="reply_${id}">reply</button>
                     </div>`;
    article.classList.add( 'post' );
    article.innerHTML = content;
    article.setAttribute( 'id', `post_${id}` );
    container.appendChild( article );
    return createThread( `#post_${id}`, comment );
  }
  return false;
}

function createThread( id, comment ) {
  const Key = document.querySelector( id );
  const Conversation = new Thread();
  const Dialog = new Post();
  Dialog.id = id.split( '_' )
    .pop();
  Dialog._comment = comment;
  Conversation.add( Dialog );
  return Threading.set( Key, Conversation );
}


function addReply( id, comment ) {
  if ( comment ) {
    const Key = document.querySelector( id );
    const Conversation = Threading.get( Key );
    const Dialog = new Post();
    Dialog._comment = comment;
    Dialog.id = Date.now();
    Conversation.add( Dialog );
    const Thread = document.querySelector( id + ' .replies' );
    const Content = `<div class="conv_dialog">${comment}</div>
                   <div class="dialog_actions"></div>`;
    const Container = document.createElement( 'DIV' );
    Container.classList.add( 'conversation' );
    Container.innerHTML = Content;
    Thread.appendChild( Container );
  }
  return false;
}