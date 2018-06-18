# propel-ig-comment-widget
Comment widget developed as part of an interview for [Ingrainhub](http://ingrainhub.com/) at Udacity's propel event.

## Installation
 - Clone the repo
 - CD to the cloned repository
 
## Use
 - Navigate to the `index.html` file in the folder holding the cloned repo
  - find the comment box
   - add a comment
   - reply to a comment
   - delete a reply

**Note** The app uses *Only* vanilla JS/CSS/HTML to behave the way it does. Thus, reducing unecessary library bulk for styling and scripting the various features.
 - The app uses a WeakMap to hold mappings to comments on the main thread
  - These comments which will have replies in a thread, are essentially the head of a linked list in JS.
  - Each new comment creates a new thread
  - Each thread offers add / search / delete features
 - The app seperates its logical concerns and has the model ( linked lists) driven from the UI via controller functions
 - The model is object oriented whereas the controllers are all modular / functional
