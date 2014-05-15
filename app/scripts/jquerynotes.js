//keep a count of the notes to ensure the id of the note is unique when the user adds one.
var _noteCount = 0;

(function ($) {

    $.fn.stickyNotes = function (options) {

        var settings = {
            id: 0,
            colour: 'yellow',
            left: 0,
            top: 0,
            height: 180,
            width: 200,
            text: 'sticky note',
            pageKey: '',
            saveMe: true,
            all: false
        };

        // Create some defaults, extending them with any options that were provided
        var settings = $.extend(settings, options);


        return this.each(function () {

            var $this = $(this);

            if (localStorage.getItem(settings.pageKey + 'notes') != null && localStorage.getItem(settings.pageKey + 'notes') != 0 && settings.saveMe) {


                var notes = localStorage.getItem(settings.pageKey + 'notes');

                for (var i = 0; i < notes; i++) {

                    var note = JSON.parse(localStorage[settings.pageKey + 'note' + i]);
                    createNote($this, i, note.colour, note.left, note.top, note.height, note.width, note.text);
                }


            }
            else if(settings.all) {

            var stageWidth = $(document).width();
            var stageHeight = $(document).height();

            createNote($this, 1, "white", 0, 0, 180, 200, "");
            createNote($this, 2, "blue", 0, 0, 180, 200, "");
            createNote($this, 3, "pink", 0, 0, 180, 200, "");
            createNote($this, 4, "purple", 0, 0, 180, 200, "");
            createNote($this, 5, "green", 0, 0, 180, 200, "");
            createNote($this, 6, "yellow", 0, 0, 180, 200, "");

            $('.note').each(function () {

               scatterNote($(this), stageWidth, stageHeight);
            });

            }
            else {

                createNote($this, settings.id, settings.colour, settings.left, settings.top, settings.height, settings.width, settings.text);

            }


            $(window).bind('beforeunload', function () {

                var notes = 0;
                $('.note').each(function () {
                    saveNote(settings.pageKey, $(this), notes);
                    notes++;
                });
                localStorage.setItem(settings.pageKey + 'notes', notes);
            });

        });

    };
})(jQuery);



function scatterNote(note, width, height) {

    width = width - $(note).width() * 2;
    height = height - $(note).height() * 2;

    var top = Math.floor(Math.random() * height);
    var left = Math.floor(Math.random() * width);

    $(note).css({ left: left + "px", top: top + "px" });
}

function saveNote(key, note, id) {

    var noteText = note.find('textarea').val();
    var noteArray = { 'top': note.position().top, 'left': note.position().left, 'text': noteText, 'colour': note.attr('rel'), 'width': note.width(), 'height': note.height() };
    localStorage[key + 'note' + id] = JSON.stringify(noteArray);

}

function createNote(body, id, colour, left, top, height, width, text) {

    var note = $('<div class="note ' + colour + '-note"  rel="' + colour + '"  id="' + id + '"><div class="' + colour + '-note-top">' +
            '<div class="add-note ui-icon ui-icon-plus"></div>' +
            '<div class="delete-note ui-icon ui-icon-close"></div>' +
            '</div><textarea class="note-textarea" value="">' + text + '</textarea></div>');

    note.css({ left: left, top: top, height: height + 'px', width: width + 'px' });
    updateTextAreaSize(note);

    body.append(note);

    note.draggable();

    note.resizable({
        stop: function (event, ui) {
            updateTextAreaSize($(this));

        }
    });

    note.find('.delete-note').click(function () {

        var note = $(this).closest('.note');
        deleteNote(note);

    });

    note.find('.add-note').click(function () {

        var colour = $(this).closest('.note').attr('rel');
        addNote(colour);

    });
    _noteCount++;
}

function deleteNote(note) {
    note.fadeOut(600, function () {
        note.remove();
    });
}

function addNote(colour) {

    createNote($('body'), 6, colour, 0, 0, 180, 200, "");
}

function updateTextAreaSize(note) {
    var width = note.width(); -10;
    var height = note.height() - 40;
    note.find('textarea').css({ width: width, height: height });
}