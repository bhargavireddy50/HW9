/*Name:Bhargavi Basi
  Course name: GUI I
  sources used: https://www.w3schools.com/css
  File type: .js file
  */
data = {"pieces": [
        {"letter": "A", "value": 1, "amount": 9},
        {"letter": "B", "value": 3, "amount": 2},
        {"letter": "C", "value": 3, "amount": 2},
        {"letter": "D", "value": 2, "amount": 4},
        {"letter": "E", "value": 1, "amount": 12},
        {"letter": "F", "value": 4, "amount": 2},
        {"letter": "G", "value": 2, "amount": 3},
        {"letter": "H", "value": 4, "amount": 2},
        {"letter": "I", "value": 1, "amount": 9},
        {"letter": "J", "value": 8, "amount": 1},
        {"letter": "K", "value": 5, "amount": 1},
        {"letter": "L", "value": 1, "amount": 4},
        {"letter": "M", "value": 3, "amount": 2},
        {"letter": "N", "value": 1, "amount": 6},
        {"letter": "O", "value": 1, "amount": 8},
        {"letter": "P", "value": 3, "amount": 2},
        {"letter": "Q", "value": 10, "amount": 1},
        {"letter": "R", "value": 1, "amount": 6},
        {"letter": "S", "value": 1, "amount": 4},
        {"letter": "T", "value": 1, "amount": 6},
        {"letter": "U", "value": 1, "amount": 4},
        {"letter": "V", "value": 4, "amount": 2},
        {"letter": "W", "value": 4, "amount": 2},
        {"letter": "X", "value": 8, "amount": 1},
        {"letter": "Y", "value": 4, "amount": 2},
        {"letter": "Z", "value": 10, "amount": 1}
    ]
};
var beginningsets = 111;
var thetilecount_board = 0;

var score = 0;
var vertical_inputword = new Array(7);
var Horizontal_inputword = new Array(7);

//loading the game and executing release and pulling of the tiles
$(document).ready(function () {
    localStorage.clear();
    gamebegin();
    releasepull();
});
//message invalid words
function confirm() {
    var message = "";
    if (vertical_inputword !== "") {
        if (!isWordFound(vertical_inputword)) {
            message = "Vertical word not  in dictionary\n";
        } else {
            message = "Vertical word  in dictionary\n";
        }
    }
    if (Horizontal_inputword !== "") {
        if (!isWordFound(Horizontal_inputword)) {
            message += "Horizontal word not in dictionary";
        } else {
            message += "Horizontal word in dictionary";
        }
    }
    alert(message);
}
//keeping track of the words
function updateWord(word, id) {
    var current_word = "";
    for (var i = 0; i < word.length; i++) {
        if (typeof word[i] === 'undefined') {

        } else {
            current_word += word[i];
        }
    }
    if (current_word) {
        $('#' + id).html(current_word);

    }
}
//dragging the tile and releasing it onto the board
function releasepull() {
    $("#rack").droppable({accept: '.img'});
    $(".img").draggable({snap: ".blocksofthe_game", snapMode: "inner", revert: 'invalid'});
    function Drag(event, ui) {

        if (ui.draggable.attr("id") === vertical_inputword[$(this).attr("id")]) {
            vertical_inputword[$(this).attr("id")] = "";
            updateWord(vertical_inputword, "vertical_word");
        }
        if (ui.draggable.attr("id") === Horizontal_inputword[$(this).attr("id")]) {
            Horizontal_inputword[$(this).attr("id")] = "";
            updateWord(Horizontal_inputword, "horizontal_word");
        }

    }
    $(".blocksofthe_game").droppable({accept: '.img', drop: Drop, out: Drag});
    function Drop(event, ui) {
        var letter = ui.draggable.prop('id');
        var element = $(this).attr("id");
        var number = parseInt(element);
        if (number === 6) {
            score = 0;
            vertical_inputword[number] = letter;
            updateWord(vertical_inputword, "vertical_word");
            Horizontal_inputword[0] = letter;
            updateWord(Horizontal_inputword, "horizontal_word");
        } else if (number < 6) {
            score = 0;
            vertical_inputword[number] = letter;
            updateWord(vertical_inputword, "vertical_word");
        } else if (number > 6) {
            score = 0;
            Horizontal_inputword[number - 6] = letter;
            updateWord(Horizontal_inputword, "horizontal_word");

        }
        updateScore(vertical_inputword);
        updateScore(Horizontal_inputword);
    }
}
//keep track of the current scores
function updateScore(word) {
    var socring = 0;
    var doubleword = 0;
    for (var i = 0; i < word.length; i++) {
        for (var j = 0; j < data.pieces.length; j++) {
            if (word[i] !== "" && (word[i] === data.pieces[j].letter)) {
                //Count the double words index
                if (i === 2) {
                    socring += data.pieces[j].value * 2;
                }
                if (i === 5) {
                    doubleword++;
                    socring += data.pieces[j].value;
                }
                if (i !== 2 && i !== 5)
                {
                    socring += data.pieces[j].value;
                }
            }
        }
    }
    //multiple the scoring by 2
    if (doubleword !== 0)
    {
        score += socring * 2;
    } else {
        score += socring;
    }
    //score being showed
    $('#player_score').html(score);
}

//see word is placed in the dictionary
function isWordFound(word) {
    var current_word = "";
    for (var i = 0; i < word.length; i++) {
        if (typeof word[i] === 'undefined') {

        } else {
            current_word += word[i];
        }
    }
    if (dict[ current_word] === true) {
        return true;
    }
    return false;
}
function begingame() {
    localStorage.clear();
    gamebegin();
    releasepull();
}
function word_next() {
    confirm();
    localStorage.setItem("thetilecount_board", thetilecount_board);
    localStorage.setItem("player_score", score);
    gamebegin();
    releasepull();
}
//game being start
function gamebegin() {
    if (localStorage.getItem("thetilecount_board") !== null && localStorage.getItem("thetilecount_board") !== "undefined") {
        thetilecount_board = localStorage.getItem("thetilecount_board");
    } else {
        thetilecount_board = 0;
    }
    if (localStorage.getItem("player_score") !== null && localStorage.getItem("player_score") !== "undefined") {
        score = localStorage.getItem("player_score");
    }
    else{
	score=0;
}

    var wordbank = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var html = "";
    var tiles = beginningsets - thetilecount_board;

    if (tiles > 13)
        tiles = 13;
    for (i = 0; i < tiles; i++) {
        var num = Math.floor((Math.random() * 26));
        letter = wordbank[num];
        html += '<img class="img" id="' + letter + '" src="images/Scrabble_Tile_' + letter + '.jpg" height="50" width="50"/>';
        thetilecount_board++;
    }
    //titles being found/count
    var remaining = beginningsets - thetilecount_board;
    if (remaining < 0)
        remaining = 0;


    vertical_inputword = new Array(7);
    Horizontal_inputword = new Array(7);
    $("#vertical_word").html(vertical_inputword);
    $("#horizontal_word").html(Horizontal_inputword);
    $("#player_score").html(score);
    $("#thetilecount_board").html(remaining);
    $("#racks").html(html);

}
