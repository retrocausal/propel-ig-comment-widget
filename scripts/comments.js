/*
 *@Post defines the structure of a post
 *which might wither be a comment on the main thread,
 *Or, a reply in a thread to a comment on the main thread
 */
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
/*
 *@Thread defines the structure of threads
 *in a conversation to a comment on the main thread
 *It also defines behaviors such as add / delete / search
 */
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
  search( value = null ) {
    let position = 1;
    let element = this.head;
    while ( element.id !== value ) {
      if ( !element._pointerNext )
        return ( -1 );
      element = element._pointerNext;
      position++;
    }
    return position;
  }
  remove( value ) {
    const position = this.search( value );
    if ( position !== -1 && position !== 1 ) {
      const element = this.fetch( position );
      const prev = this.fetch( position - 1 );
      const next = this.fetch( position + 1 );
      prev._pointerNext = ( next ) ? next : null;
    }
  }
  fetch( position = null ) {
    return ( position ) ? ( () => {
      let element = this.head;
      let count = 1;
      while ( count < position ) {
        if ( !element._pointerNext ) {
          return false;
        }
        element = element._pointerNext;
        count++;
      }
      return element;
    } )() : false;
  }
}

/*
 * View ops
 * operte on the UI/ the DOM
 * and call controller ops as necessary
 */

/*
 *@postComment posts a comment on the main thread
 */
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
/*
 *@addReply adds a threaded reply to a comment
 *on the main thread
 */
function addReply( id, comment ) {
  if ( comment ) {
    const Key = document.querySelector( id );
    const Dialog = addToThread( Key, comment );
    const Thread = document.querySelector( id + ' .replies' );
    const Content = `<div class="conv_dialog">${comment}</div>
                   <div class="dialog_actions">
                      <a href="${id}" id="${id}-reply_${Dialog.id}" onclick="event.stopPropagation();deleteReply(this)">X</a>
                   </div>`;
    const Container = document.createElement( 'DIV' );
    Container.classList.add( 'conversation' );
    Container.setAttribute( 'id', `reply_${Dialog.id}` );
    Container.innerHTML = Content;
    Thread.appendChild( Container );
  }
  return false;
}
/*
 *@deleteReply deletes a reply from a thread
 *to a comment on the main thread
 */
function deleteReply( target ) {
  const Id = target.getAttribute( 'id' );
  const replyId = `#${Id.split( '-' )
    .pop()}`;
  const postId = Id.split( '-' )
    .shift();
  const Thread = document.querySelector( postId + ' .replies' );
  const Reply = document.querySelector( postId + ' .replies ' + replyId );
  Thread.removeChild( Reply );
  const commentId = Number( replyId.split( '_' )
    .pop() );
  const Key = document.querySelector( postId );
  return removeFromThread( Key, commentId );
}


/*
 * Controller ops
 * Operate on the linked list classes which are the models
 */

/*
 *@createThread creates a new thread
 *this thread is mapped to a key which is
 *the DOM element constituting the original comment
 *or, the parent of the conversation
 */
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
/*
 *@addToThread adds a post to the thread
 */
function addToThread( Key, comment ) {
  const Conversation = Threading.get( Key );
  const Dialog = new Post();
  Dialog._comment = comment;
  Dialog.id = Date.now();
  Conversation.add( Dialog );
  return Dialog;
}
/*
 *@removeFromThread removes a post from a thread
 */
function removeFromThread( Key, commentId ) {
  const Conversation = Threading.get( Key );
  Conversation.remove( commentId );
}