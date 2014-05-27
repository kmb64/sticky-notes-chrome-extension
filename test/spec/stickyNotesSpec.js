/*global describe, beforeEach, it, StickyNotes, spyOn, expect, $*/

'use strict';

describe('Sticky notes', function () {

  beforeEach(function () {
  });

  it('should construct a coloured sticky note', function(){

    var $note = StickyNotes.create();

    expect($note.hasClass('kbsn-sticky-note')).toBeTruthy();
    expect($note.hasClass('kbsn-pink')).toBeTruthy();
    expect($note.find('textarea').length).toBeGreaterThan(0);
  });

  it('should add a sticky note to a web page', function(){
    var spy = spyOn($.fn, 'append');

    var $note = StickyNotes.create();
    StickyNotes.add($note);

    expect(spy).toHaveBeenCalledWith($note);
  });

  it('should make the sticky note draggable', function(){
    var spy = spyOn($.fn, 'draggable');
    StickyNotes.create('pink');
    expect(spy).toHaveBeenCalled();
  });

  it('should make the sticky note resizable', function(){
    var spy = spyOn($.fn, 'resizable');
    StickyNotes.create('pink');
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to delete a sticky note', function(){
    var spy = spyOn($.fn, 'remove');
    StickyNotes.destroy($('<div></div>'));
    expect(spy).toHaveBeenCalled();
  });

  it('should set the colour of a sticky note', function(){
    var $note = StickyNotes.create();
    StickyNotes.setColour($note, 'blue');
    expect($note.hasClass('kbsn-blue')).toBeTruthy();
    expect(StickyNotes.getColour($note)).toBe('blue');
  });

});
