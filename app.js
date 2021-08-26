$(document).ready(function () {
    var questionBank = new Array;
    var rnd;
    var wordArray = new Array;
    var currentWord;
    $(".button").click(function () {
        $.getJSON('wordbank.json', function (data) {
            for (i = 0; i < data.words.length; i++) {
                questionBank[i] = data.words[i];
            }
            for (i = 0; i < 50; i++){
                rnd = Math.floor(Math.random() * questionBank.length);
                $(".giventxt").append(questionBank[rnd] + " ");
            }

            
            /* $.each(data, function (rnd, field) {

                $(".giventext").append(fields + " ");
            }); */
        });
    });
    /*getWord();
   setGivenText();
   $.getJSON('wordbank.json', function (data) {
       for (i = 0; i < data.words.length; i++) {
           questionBank[i] = data.words[i].word;
       }
       console.log(questionBank[1]);
   });
   function getWord() {
       var rnd = Math.floor(Math.random() * questionBank.length);
       currentWord = questionBank[rnd];
       /* questionBank.splice(rnd, 1);
       wordArray = currentWord.split(""); 
   }//getword

   function setGivenText() {
       $(".giventext").text(currentWord);
       console.log(currentWord);

   } */

});