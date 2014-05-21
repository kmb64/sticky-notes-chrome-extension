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

  var COLOUR_SELECT_HTML = '<div class="kbsn-colour-select">' +
      '<ul>' +
      '<li class="yellow" data-colour="yellow">Yellow</li>' +
      '<li class="blue" data-colour="blue">Blue</li>' +
      '<li class="pink" data-colour="pink">Pink</li>' +
      '<li class="purple" data-colour="purple">Purple</li>' +
      '<li class="white" data-colour="white">White</li>' +
      '<li class="green" data-colour="green">Green</li>' +
      '</ul>' +
      '</div>';

//  var COLOURS = {
//    yellow : 'yellow',
//    blue : 'blue',
//    pink : 'pink',
//    purple : 'purple',
//    white : 'white',
//    green : 'green'
//  };

  var setUpColourMenu = function($note) {
    var $colourMenu = $(COLOUR_SELECT_HTML);
    $colourMenu.find('ul > li').each(function(){
      $(this).click(function(){
        colourNote($note, $(this).attr('data-colour'));
      });
    });
    $note.append($colourMenu);
  };

  var colourNote = function($note, colour) {
    $note.removeClass(CSS_CLASS_PREFIX + '-' + $note.colour);
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

    $note.on('contextmenu', function(){
      console.log('show colour selection');
    });

    setUpColourMenu($note);

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
      loadNote('value') ;
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









