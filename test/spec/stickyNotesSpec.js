/*global describe, beforeEach, it, StickyNotes, spyOn, expect, $*/

'use strict';

describe('Sticky notes', function () {

  beforeEach(function () {
  });

  it('should construct a coloured sticky note', function(){

    var $note = StickyNotes.create('pink');

    expect($note.hasClass('kbsn-sticky-note')).toBeTruthy();
    expect($note.hasClass('kbsn-pink')).toBeTruthy();
    expect($note.find('textarea').length).toBeGreaterThan(0);
  });

  it('should add a sticky note to a web page', function(){
    var spy = spyOn($.fn, 'append');

    var $note = StickyNotes.create('pink');
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

  it('should position a sticky note correctly on the page', function(){
    var spy = spyOn($.fn, 'css');

    var $note = StickyNotes.create('pink');
    StickyNotes.add($note);

    expect(spy).toHaveBeenCalledWith({'position': 'absolute','left' : 20, 'top' : 20});
  });

  it('should colour a sticky note', function(){
    var $note = $('<div></div>');
    StickyNotes.setColour($note, 'pink');
    expect($note.hasClass('kbsn-pink')).toBeTruthy();
    expect($note.colour).toBe('pink');
  });

});
