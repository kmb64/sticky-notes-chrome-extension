/*global jQuery, chrome*/

'use strict';

var StickyNotes = (function($){

  var CSS_CLASS_PREFIX = 'kbsn';
  var $body = $('body');
  var $document = $(document);
  var DEFAULT_COLOUR = 'pink';
  var NOTE_STORAGE_KEY = 'kbsn-sticky-notes';

  var NOTE_HTML = '<div class="kbsn-sticky-note"><div class="kbsn-top"><div class="add kbsn-icon plus"></div>' +
      '<div class="delete kbsn-icon close"></div></div><textarea class="kbsn-textarea" value=""></textarea></div>';

  var COLOUR_SELECT_HTML = '<div class="kbsn-colour-select"><ul><li class="yellow" data-colour="yellow">Yellow</li>' +
      '<li class="blue" data-colour="blue">Blue</li><li class="pink" data-colour="pink">Pink</li>' +
      '<li class="purple" data-colour="purple">Purple</li><li class="white" data-colour="white">White</li>' +
      '<li class="green" data-colour="green">Green</li></ul></div>';

  var init = function(){

    chrome.storage.sync.get(NOTE_STORAGE_KEY, function(obj) {
      if(obj[NOTE_STORAGE_KEY].length) {
        $.each(obj[NOTE_STORAGE_KEY], function(){
          addNote(createNote(this.colour, this.size, this.text), this.position);
        });
      }
      else {
        addNote(createNote(DEFAULT_COLOUR, {width:200,height:200}, ''), {x:20,y:20});
      }
    });

    //Close colour select context menus when clicking outside
    $document.on('mouseup', function(event){
      $('.kbsn-colour-select').each(function(){
        if (!$(this).is(event.target)){
          $(this).hide();
        }
      });
    });

    $(window).unload(function(){
      var noteModels = [];

      $('.kbsn-sticky-note').each(function(){
        var thisNote = $(this);
        noteModels.push({
          colour : thisNote.attr('data-note-colour'),
          position : {
            x : thisNote.offset().left,
            y : thisNote.offset().top
          },
          size : {
            width : thisNote.width(),
            height: thisNote.height()
          },
          text : thisNote.find('.kbsn-textarea').val()
        });
      });
      saveNote({STORAGE_KEY: noteModels});
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

    return $colourMenu;
  };

  var colourNote = function($note, colour) {
    $note.removeClass(CSS_CLASS_PREFIX + '-' + $note.attr('data-note-colour'));
    $note.addClass(CSS_CLASS_PREFIX + '-' + colour);
    $note.attr('data-note-colour', colour);
  };

  var updateTextAreaSize = function($note) {
    //- 20px for right/left padding
    var width = $note.width() - 20;
    //-30px for note top + 20px for top/bottom padding
    var height = $note.height() - 50;
    $note.find('.kbsn-textarea').css({
      'width' : width,
      'height' : height
    });
  };

  var createNote = function(colour, size, text) {
    var $note = $(NOTE_HTML);
    colourNote($note, colour);

    $note.css({
      width : size.width,
      height : size.height
    });

    $note.find('.kbsn-textarea').val(text);

    var $delete  = $note.find('.kbsn-icon.delete');
    $delete.click(function(){
      deleteNote($note);
    });

    var $add = $note.find('.kbsn-icon.add');
    $add.click(function(){
      addNote(createNote($note.attr('data-note-colour'), {width:200, height:200}, ''), {x:20,y:20});
    });

    $note.draggable();
    $note.resizable({
      stop : function(){
        updateTextAreaSize($note);
      }
    });

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

    return $note;
  };

  var addNote = function($note, position) {
    $body.append($note);
    $note.css({
      'position': 'absolute',
      'left' : position.x,
      'top' : position.y
    });
    updateTextAreaSize($note);
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

  return {
    createNote : createNote,
    addNote : addNote,
    deleteNote : deleteNote,
    colourNote : colourNote,
    saveNote : saveNote,
    setUp : init
  };
}(jQuery));

StickyNotes.setUp();










