const rhymesApp = {};
rhymesApp.apiKey = `9XESNPgsQwmshJuXetusEPPBhMylp15KY0tjsnZmXwr8rhaViH`;

rhymesApp.getRhyme = function (word) {
    $.ajax({
        url: `https://wordsapiv1.p.mashape.com/words/${word}/rhymes`, 
        method: 'GET',
        headers: {
            'X-Mashape-Key': rhymesApp.apiKey
        }
    })
    .then(function (data) {  
        console.log(data);
    });
};
rhymesApp.getRhyme('orange');

    // event.preventDefault();

    // $(".startForm").on("submit", function (event) {
    //     const firstLineInput = $(".firstLine").val();
    //     console.log(firstLineInput);
    // });

window.onload = rotate;

var theTitle = 0;
const headerImages = new Array("../assets/word-1.png", "../assets/word-2.png", "../assets/word-3.png", "../assets/word-4.png", "../assets/word-5.png", "../assets/word-6.png" );

function rotate() {
    theTitle++;
    if (theTitle == headerImages.length) {
        theTitle = 0;
    }
    document.getElementById("titleImage").src = headerImages[theTitle];

    setTimeout(rotate, 3 * 250);
}


/* PSEUDOCODE


1. Take the imput strings (first 2 sentences - lines) from user on submit
<< should be a submit/next button after 2 inputs

2. get the last words from the imput strings and save them in variables

3. use these words to pass to API rhymesApp.getRhyme('{WORD1, WORD2}');

4. get a few rhymes back (- may want to limit later)

!!!!!  don't show words that already contain the imput string!! (ORANGE - BLOODY ORANGE)

5. pass them to select dropdown menus on lines 3 & 4

6. user picks the desired rhyme word

7. the word is added to the next lines

!!!! need to decide what goes first: 
3d sentence & the word is added to the string     OR
the word itself & then user adds the rest of the sentence
....

user gets the whole 4 lines of a poem (styled & pretty) on a new page


*/

// init function to get the app going
rhymesApp.init = function () {
    console.log('lets go!');
};


// document ready
$(function () {
    rhymesApp.init();
});

