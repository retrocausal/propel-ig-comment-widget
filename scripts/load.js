const Threading = new WeakMap();
window.addEventListener( 'DOMContentLoaded', ( e ) => {
  const actor = document.querySelector( '.add-comment' );
  actor.addEventListener( 'click', e => {
    return postComment();
  } );
  const postArea = document.querySelector( '#posts' );
  postArea.addEventListener( 'click', e => {
    const Target = e.target;
    if ( Target.nodeName === 'A' || Target.nodeName === 'BUTTON' ) {
      const Id = Target.getAttribute( 'id' );
      const postId = '#post_' + Id.split( '_' )
        .pop();
      const Thread = document.querySelector( postId + ' .replies' );
      switch ( Target.nodeName ) {
      case "A":
        const Reply = document.querySelector( postId + ' .reply' );
        Thread.classList.toggle( 'open' );
        Reply.classList.toggle( 'open' );
        break;
      case "BUTTON":
        const Comment = document.querySelector( postId + ' #in-thread-comment' )
          .value;
        addReply( postId, Comment );
        break;
      default:
        //Do nothing
      }
    }
  } );
} );