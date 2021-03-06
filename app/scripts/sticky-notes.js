/*global jQuery*/
/*exported StickyNotes*/

'use strict';

var StickyNotes = (function ($) {

  //Data attributes
  var DATA_COLOUR = 'data-colour',
    DATA_NOTE_COLOUR = 'data-note-colour',

  //jQuery class selectors
    TEXT_AREA = '.kbsn-textarea',
    DELETE_ICON = '.kbsn-icon.delete',
    ADD_ICON = '.kbsn-icon.add',
    ZOOMIN_ICON = '.kbsn-icon.zoomin',
    ZOOMOUT_ICON = '.kbsn-icon.zoomout',
    STICKY_NOTES = '.kbsn-sticky-note',

  //HTML fragments
    NOTE_HTML = '<div class="kbsn-sticky-note"><div class="kbsn-top"><div class="add kbsn-icon plus"></div>' +
      '<div class="kbsn-icon zoomin"></div><div class="kbsn-icon zoomout"></div>' +
      '<div class="delete kbsn-icon close"></div></div><textarea class="kbsn-textarea" value=""></textarea></div>',

    COLOUR_SELECT_HTML = '<div class="kbsn-colour-select"><ul><li class="yellow" data-colour="yellow">Yellow</li>' +
      '<li class="blue" data-colour="blue">Blue</li><li class="pink" data-colour="pink">Pink</li>' +
      '<li class="purple" data-colour="purple">Purple</li><li class="white" data-colour="white">White</li>' +
      '<li class="green" data-colour="green">Green</li>' +
      '<li id="kbsn-new-note" class="white">New note</li>' +
      '<li id="kbsn-delete-note" class="white">Delete note</li>' +
      '</ul></div>',

    CSS_CLASS_PREFIX = 'kbsn',
    $body = $('body');

  var setUpColourMenu = function ($note) {
    var $colourMenu = $(COLOUR_SELECT_HTML);
    $colourMenu.find('ul > li').each(function () {

      var $menuItem = $(this);

      if ($menuItem.attr('id') === 'kbsn-new-note') {

        $menuItem.click(function() {
          add(create({
            'colour': getColour($note)
          }));
        });

      } else if ($menuItem.attr('id') === 'kbsn-delete-note') {

        $menuItem.click(function () {
          destroy($note);
        });

      } else {

        $menuItem.click(function () {
          setColour($note, $(this).attr(DATA_COLOUR));
          $colourMenu.hide();
        });
      }
    });
    $note.append($colourMenu);

    //Close colour select context menus when clicking outside
    $(document).on('mouseup', function (event) {
      if (!$colourMenu.is(event.target)) {
        $colourMenu.hide();
      }
    });

    return $colourMenu;
  };

  var setColour = function ($note, colour) {
    $note.removeClass(CSS_CLASS_PREFIX + '-' + getColour($note));
    $note.addClass(CSS_CLASS_PREFIX + '-' + colour);
    $note.attr(DATA_NOTE_COLOUR, colour);
  };

  var getColour = function ($note) {
    return $note.attr(DATA_NOTE_COLOUR);
  };

  var updateTextAreaSize = function ($note) {
    //- 20px for right/left padding
    var width = $note.width() - 20;
    //-30px for note top + 20px for top/bottom padding
    var height = $note.height() - 50;
    $note.find(TEXT_AREA).css({
      'width': width,
      'height': height
    });
  };

  var create = function (options) {

    var settings = $.extend({
      colour: 'pink',
      width: 200,
      height: 200,
      x: 20,
      y: 20,
      text: '',
      fontSize : '16px'
    }, options);

    var $note = $(NOTE_HTML);
    setColour($note, settings.colour);

    $note.find(TEXT_AREA).val(settings.text);

    var $delete = $note.find(DELETE_ICON);
    $delete.click(function () {
      destroy($note);
    });

    var $add = $note.find(ADD_ICON);
    console.log('clicked');
    $add.click(function () {
      add(create({
        'colour': getColour($note)
      }));
    });

    var $zoomin = $note.find(ZOOMIN_ICON),
      $zoomout = $note.find(ZOOMOUT_ICON),
      $textArea = $note.find(TEXT_AREA);

    $textArea.css('font-size', settings.fontSize);

    $zoomin.click(function() {
      var fontSize;
      fontSize = parseInt($textArea.css('font-size')) + 1;
      $textArea.css('font-size', fontSize);
    });

    $zoomout.click(function() {
      var fontSize;
      fontSize = parseInt($textArea.css('font-size')) - 1;
      $textArea.css('font-size', fontSize);
    });

    $note.draggable();
    $note.resizable({
      stop: function () {
        updateTextAreaSize($note);
      }
    });

    $note.css({
      position: 'absolute',
      top: settings.y,
      left: settings.x,
      width: settings.width,
      height: settings.height
    });

    var $colourMenu = setUpColourMenu($note);

    $note.on('contextmenu', function (event) {
      var offset = $(this).offset();
      $colourMenu.css({
        'left': event.pageX - offset.left,
        'top': event.pageY - offset.top
      });
      $colourMenu.show();
      return false;
    });

    return $note;
  };

  var add = function ($note) {
    $body.append($note);
    updateTextAreaSize($note);
  };

  var destroy = function ($note) {
    $note.fadeOut(300, function () {
      $note.remove();
    });
  };

  var getAll = function () {
    return $(STICKY_NOTES);
  };

  var getText = function ($note) {
    return $note.find(TEXT_AREA).val();
  };

  var getFontSize = function ($note) {
    return $note.find(TEXT_AREA).css('font-size');
  };

  return {
    create: create,
    add: add,
    destroy: destroy,
    setColour: setColour,
    getAll: getAll,
    getColour: getColour,
    getText: getText,
    getFontSize : getFontSize
  };
}(jQuery));










