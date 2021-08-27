$(document).ready(function () {
    var questionBank = new Array;
    var rnd;
    var giventext;
    var inputtext;
    var giventextraw = $(".giventxt");
    var inputfield = $(".inputfield");
    var time = $(".time");
    var output = $(".output");
    var keyupcounter = 0;
    var startTime;
    var timeSpentInSec;
    var interval = 1000;
    var myInterval;
    var correctwordscounter;
    

    getWordbank();
    $(".redo").click(function () {
        //$(".redo").parent('div').find('.inputfield').val('');
        inputtext.length = 0;
    });
    
    $('input').keyup(function () {
        ++keyupcounter;
        if (keyupcounter == 1) {
            startTime = new Date().getTime();
            myInterval = setInterval(everySecond, interval);

            function everySecond () {
                console.log(myCallback());
                time.text(Math.floor(myCallback()));
                setTimeout(sixtySecondsOver, 5000);
            }
        }

        compare();

    });
    $(".helo").click(function () {
        clearInterval(myInterval);

        //console.log(inputtext);
    });

    function sixtySecondsOver() { 
        clearInterval(myInterval); 
        output.text(getWPM());
    }

    function getWPM(){
        return correctwordscounter;
    }

    function getWordbank() {
        $.getJSON('wordbank.json', function (data) {
            for (i = 0; i < data.words.length; i++) {
                questionBank[i] = data.words[i];
            }
            for (i = 0; i < 50; i++) {
                rnd = Math.floor(Math.random() * questionBank.length);
                $(".giventxt").append(questionBank[rnd] + " ");
            }
        });
    }

    function getGivenText() {
        /* var giventext = giventext.text().split(" ");
        console.log(giventext); */
        giventext = $(giventextraw).map(function () {
            return this.textContent.trim().split(" ");
        }).get();
        //console.log(giventext);
        return getGivenText;
    }
    function getInputfield() {
        inputtext = inputfield.val().split(" ");
        //console.log(inputtext);
        return inputtext;
    }
    function compare() {
        correctwordscounter = 0;
        getGivenText();
        getInputfield();
        for (let i = 0; i < giventext.length; i++) {
            if (inputtext[i] == giventext[i]) {
                console.log("worked");
                ++correctwordscounter;
                //output.text(++correctwordscounter);
            }
            else {
                console.log("fk you");
            }
        }

    }

    //setTimeout(myCallback, 200);

    function myCallback() {
        var endTime = new Date().getTime();
        var timeSpent = endTime - startTime;
        timeSpentInSec = timeSpent / 1000;
        return timeSpentInSec;
    }
});