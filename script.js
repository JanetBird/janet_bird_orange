const rhymesApp = {
    apiRequestSuccessCounter: 0,
    // create properties below to differenciate the responces from API
    firstLineWord: '',
    secondLineWord: '',


    thirdLineOptions: [],
    fourthLineOptions: [],
};
rhymesApp.apiKey = `9XESNPgsQwmshJuXetusEPPBhMylp15KY0tjsnZmXwr8rhaViH`;



rhymesApp.getRhyme = function (word) {
    return $.ajax({
        url: `https://wordsapiv1.p.mashape.com/words/${word}/rhymes`, 
        method: 'GET',
        headers: {
            'X-Mashape-Key': rhymesApp.apiKey
        }
    })
};

rhymesApp.goToStepTwo = function() {
    // hide first step section, show second step section
    

    // choose random up to 20 words for third line & for fourth

    // create word options in HTML

    // add word hightlight functionality using $(this).toggleClass('selectedRhymeOption')
}

rhymesApp.goToStepThree = function () {

}

rhymesApp.restart = function () {

}


// 1

rhymesApp.setupUserEvents = function() {
    // create a function that saves user input values from Lines 1 & 2
    // this code will run, when form is submitted
    $('#stepOneForm').on('submit', function (event) {
        // prevents form default behaviour
        event.preventDefault();
        // get user input and saves it in a variable
        const userInputFirstLine = $('#firstLine').val();
        const userInputSecondLine = $('#secondLine').val();

        // extracts & saves the last words from the user input strings 
        const lastWordFirstLine = userInputFirstLine.split(" ").splice(-1);
        const lastWordSecondLine = userInputSecondLine.split(" ").splice(-1);

        // saving the words from user input for later use
        // rhymesApp.firstLineWord = lastWordFirstLine;
        // rhymesApp.secondLineWord = lastWordSecondLine;


        // getting the rhymes on those words
        // rhymesApp.getRhyme(lastWordFirstLine);
        // rhymesApp.getRhyme(lastWordSecondLine);

        // saving both words in array
        const words = [lastWordFirstLine, lastWordSecondLine];

        // passing "pokemonApp.pokemonGetter" function above and maping through an array
        const wordPromises = words.map(rhymesApp.getRhyme);

        console.log(wordPromises);

        $.when(...wordPromises)
            .then((...result) => {
                
                console.log(result);

                result.forEach(result => {
                    // console.log(result);
                    let response = result[0];
                    // console.log(lastWordFirstLine);
                    if (response.word === lastWordFirstLine[0]) {
                        rhymesApp.thirdLineOptions = response.rhymes.all;
                        console.log(rhymesApp.thirdLineOptions);
                    }
                });
            });
    });
    
}



// RESET THE FORM ON STEP 2







// 2
// rhymesApp.getRhyme(lastWordFirstLine);
// rhymesApp.getRhyme(lastWordSecondLine);




/* PSEUDOCODE


1. Take the imput strings (first 2 lines) from user on click of "NEXT" button

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
    rhymesApp.setupUserEvents();
};


// document ready
$(function () {
    rhymesApp.init();
});

