/*global chrome, $, StickyNotes*/

'use strict';

var NOTE_STORAGE_KEY = 'kbsn-sticky-notes';

var stickyNotesExist = function(){
  return StickyNotes.getAll().length;
};

var saveStickyNotes = function(){
  var noteModels = [];
  StickyNotes.getAll().each(function(){
    var thisNote = $(this);
    noteModels.push({
      colour : StickyNotes.getColour(thisNote),
      x : thisNote.offset().left,
      y : thisNote.offset().top,
      width : thisNote.width(),
      height: thisNote.height(),
      text : thisNote.find('.kbsn-textarea').val()
    });
  });

  chrome.storage.sync.set({'kbsn-sticky-notes': noteModels}, function() {
    console.log('Notes saved');
  });
};

var loadStickyNotes = function(){
  chrome.storage.sync.get(NOTE_STORAGE_KEY, function(obj) {
    console.log(obj);
    if(typeof obj[NOTE_STORAGE_KEY] !== 'undefined' && obj[NOTE_STORAGE_KEY].length) {

      $.each(obj[NOTE_STORAGE_KEY], function(){
        StickyNotes.add(StickyNotes.create({
          'colour': this.colour,
          'width' : this.width,
          'height' : this.height,
          'x' : this.x,
          'y' : this.y,
          'text' : this.text
        }));
      });
    }
    else {
      StickyNotes.add(StickyNotes.create());
    }
  });
};

if(!stickyNotesExist()){
  loadStickyNotes();

  $(window).unload(function(){
    if(stickyNotesExist()) {
      saveStickyNotes();
    }
  });

  $(document).mouseup(function(e){
    var stickyNotes = StickyNotes.getAll();
    if (!stickyNotes.is(e.target) && stickyNotes.has(e.target).length === 0 && stickyNotesExist()) {
      saveStickyNotes();
      stickyNotes.each(function(){
        StickyNotes.destroy($(this));
      });
    }
  });

  $(window).blur(function() {
    if(stickyNotesExist()){
      saveStickyNotes();
      StickyNotes.getAll().each(function(){
        StickyNotes.destroy($(this));
      });
    }
  });
}