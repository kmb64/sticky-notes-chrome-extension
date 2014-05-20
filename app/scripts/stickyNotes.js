/*global jQuery, chrome*/

'use strict';

var StickyNotes = (function($){

  var CSS_CLASS_PREFIX = 'kbsn';
  var $body = $('body');

  var NOTE_HTML = '<div class="kbsn-sticky-note">' +
    '<div class="kbsn-top">' +
    '<div class="add kbsn-icon plus"></div>' +
    '<div class="delete kbsn-icon close"></div>' +
    '</div>' +
    '<textarea class="kbsn-textarea" value=""></textarea>' +
    '</div>';

  var colourNote = function($note, colour) {
    $note.addClass(CSS_CLASS_PREFIX + '-' + colour);
    $note.colour = colour;
  };

  var createNote = function(colour) {
    var $note = $(NOTE_HTML);

    colourNote($note, colour);

    var $delete  = $note.find('.kbsn-icon.delete');
    $delete.click(function(){
      deleteNote($note);
    });

    var $add = $note.find('.kbsn-icon.add');
    $add.click(function(){
      addNote(createNote($note.colour));
    });

    $note.draggable();
    $note.resizable();

    return $note;
  };

  var addNote = function($note) {
    $body.append($note);
    $note.css({
      'position': 'absolute',
      'left' : 20,
      'top' : 20
    });
  };

  var deleteNote = function($note){
    $note.fadeOut(300, function(){
      $note.remove();
    });
  };

  var saveNote = function() {
    chrome.storage.sync.set({'value': 'karl'}, function() {
      // Notify that we saved.
      console.log('Settings saved');
      loadNote('value')
    });

    chrome.tabs.onActivated.addListener(function(){
      chrome.tabs.query('active', function(active) {
        if(active){
          alert('hi');
        }
      });
    });

  };

  var loadNote = function(key) {
    chrome.storage.sync.get(key, function(data) {
      // Notify that we saved.
      console.log('Settings loaded' + data);
      console.log(data);
    });



  };

  return {
    createNote : createNote,
    addNote : addNote,
    deleteNote : deleteNote,
    colourNote : colourNote,
    saveNote : saveNote
  };
}(jQuery));

var $note = StickyNotes.createNote('pink');

StickyNotes.addNote($note);
StickyNotes.saveNote();









