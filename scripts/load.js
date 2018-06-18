//Create a weak  structure that is garbage collected as a comment is deleted
//Or, on refresh
const Threading = new WeakMap();

/*
 *EVENT DELEGATION
 */

//Add event handlers for click events on clickable targets
window.addEventListener( 'DOMContentLoaded', ( e ) => {
  //Adds a comment to the main thread
  const actor = document.querySelector( '.add-comment' );
  actor.addEventListener( 'click', e => {
    return postComment();
  } );
  //Adds event listeners to
  //Add Replies to a comment on the main thread
  //And to toggle visibility of conversations
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