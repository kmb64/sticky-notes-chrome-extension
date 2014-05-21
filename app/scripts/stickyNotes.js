/*global jQuery, chrome*/

'use strict';

var StickyNotes = (function($){

  var CSS_CLASS_PREFIX = 'kbsn';
  var $body = $('body');
  var $document = $(document);
  var $notes = [];
  var $colourMenus = [];

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

  var init = function(){
    //grab notes from storage
    loadNote('kbsn-sticky-notes');

    //else create a note
    addNote(createNote('pink'));

    //Close colour select context menus when clicking outside
    $document.on('mouseup', function(event){
      $.each($colourMenus, function(){
        if (!this.is(event.target)){
          this.hide();
        }
      });
    });

    $(window).unload(function(){
      var noteModels = [];

      $.each($notes, function(){
        noteModels.push({
          colour : this.colour,
          position : {
            x : this.offset().left,
            y : this.offset().top
          },
          size : {
            width : this.width(),
            height: this.height()
          },
          text : this.find('.kbsn-textarea').val()
        });
      });
      saveNote({'kbsn-sticky-notes': noteModels});
      console.log('Notes saved -->' + noteModels);
    });
  };

  var setUpColourMenu = function($note) {
    var $colourMenu = $(COLOUR_SELECT_HTML);
    $colourMenu.find('ul > li').each(function(){
      $(this).click(function(){
        colourNote($note, $(this).attr('data-colour'));
        $colourMenu.hide();
      });
    });
    $note.append($colourMenu);
    $colourMenus.push($colourMenu);

    return $colourMenu;
  };

  var colourNote = function($note, colour) {
    $note.removeClass(CSS_CLASS_PREFIX + '-' + $note.colour);
    $note.addClass(CSS_CLASS_PREFIX + '-' + colour);
    $note.colour = colour;
  };

  var createNote = function(colour, position, size, text) {
    colour = colour || 'pink';
    position = position || {x : 20, y : 20};
    size = size || {width : 200, height : 200};
    text = text || '';

    //updateTextAreaSize() ??

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

    var $colourMenu = setUpColourMenu($note);

    $note.on('contextmenu', function(event){
      var offset = $(this).offset();
      $colourMenu.css({
        'left' : event.pageX - offset.left,
        'top' : event.pageY - offset.top
      });
      $colourMenu.show();
      return false;
    });

    $notes.push($note);
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

  var saveNote = function(obj) {

    chrome.storage.sync.set(obj, function() {
      console.log('Notes saved');
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
    saveNote : saveNote,
    start : init
  };
}(jQuery));

StickyNotes.start();










