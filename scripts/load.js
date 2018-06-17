window.addEventListener( 'DOMContentLoaded', ( e ) => {
  const actor = document.querySelector( '.add-comment' );
  actor.addEventListener( 'click', ( e ) => {
    postComment();
  } );
  const postArea = document.querySelector( '#posts' );
  postArea.addEventListener( 'click', ( e ) => {
    const Target = e.target;
    if ( Target.nodeName === 'A' ) {
      const Id = Target.getAttribute( 'id' );
      const postId = '#post_' + Id.split( '_' )
        .pop();
      const Thread = document.querySelector( postId + ' .replies' );
      Thread.classList.toggle( 'open' );
    }
  } );
} );