const rhymesApp = {

    firstLine: '',
    secondLine: '',
    thirdLine: '',
    fourthLine: ''
};

rhymesApp.apiKey = `9XESNPgsQwmshJuXetusEPPBhMylp15KY0tjsnZmXwr8rhaViH`;

// api request function
rhymesApp.getRhyme = function (word) {
    return $.ajax({
        url: `https://wordsapiv1.p.mashape.com/words/${word}/rhymes`,
        method: 'GET',
        headers: {
            'X-Mashape-Key': rhymesApp.apiKey
        }
    })
};

// function displaying rhyme results on the page
rhymesApp.displayRhymeOptions = function (options, containerID) {
    // creating container constant
    const container = $(`#${containerID}`);
    // looping through an array & adding elements to display rhyme options
    options.forEach(option => {
        // create word options in HTML
        const optionElement = `<p class="rhymeOption">${option}</p>`;
        // & display on the page
        container.append(optionElement);
    });
}

rhymesApp.getRandomRhymes = function (arr, originalWord, numElements) {
    // numElements is how many random rhymes we want to get in the array
    const randomRhymes = [];

    // use 'for' loop instead of 'while' to not accidentally create infinite loops in edge cases 
    for (let i = 0; i < arr.length; i++) {
        if (randomRhymes.length === numElements) {
            // break out of the loop as soon as we have collected the required number of elements
            break;
        }
        // get random rhyme option from the original array
        let randomArrIndex = Math.floor(Math.random() * arr.length - 1);
        let currentRhyme = arr[randomArrIndex];


        // as we checked what results API gives us, we need to filter out the original word if it is present in the results coming back from the API

        // if the random rhyme is not the original word and if it's not already in the array of random words (not to have repeated rhyme options on display) add it to the list
        if (currentRhyme !== originalWord && randomRhymes.indexOf(currentRhyme) === -1) {
            randomRhymes.push(currentRhyme);
        }
    }

    return randomRhymes;
}

// This function is run when user enters their poem's first 2 lines, and clicks the button to go to the next step
rhymesApp.goToStepTwo = function () {

    $('.rhymeOption').remove();

    // gets user input (first two sentences) and saves it in a variable
    const userInputFirstLine = $('#firstLineInput').val();
    const userInputSecondLine = $('#secondLineInput').val();

    // save lines values to display later
    rhymesApp.firstLine = userInputFirstLine;
    rhymesApp.secondLine = userInputSecondLine;

    // extracts & saves the last words from the user input strings 
    const lastWordFirstLine = userInputFirstLine.split(" ").splice(-1);
    const lastWordSecondLine = userInputSecondLine.split(" ").splice(-1);

    // saving both words in array
    const words = [lastWordFirstLine, lastWordSecondLine];

    // calling rhymesApp.getRhyme function to get response with rhymes for all elements of words array from the API
    const wordPromises = words.map(rhymesApp.getRhyme);
    // spreading wordPromises array
    $.when(...wordPromises)
        .then((...result) => {
            result.forEach(result => {
                let response = result[0];
                let chosenOptions = [];
                console.log('responseeeee', response);
                // THIRD LINE CONTENTS
                if (response.word === lastWordFirstLine[0]) {
                    const thirdLineOptions = response.rhymes.all;

                    if (thirdLineOptions === undefined) {
                        // will return orange on every "help me rhyme click", unless the page is refreshed
                        chosenOptions = ['Orange'];

                    } else if (thirdLineOptions.length > 20) {

                        chosenOptions = rhymesApp.getRandomRhymes(thirdLineOptions, lastWordFirstLine[0], 20);
                    } else {
                        chosenOptions = thirdLineOptions;
                    }

                    rhymesApp.displayRhymeOptions(chosenOptions, 'thirdLineOptions');
                };

                // FOURTH LINE CONTENTS
                if (response.word === lastWordSecondLine[0]) {
                    const fourthLineOptions = response.rhymes.all;

                    if (fourthLineOptions === undefined) {
                        chosenOptions = ['Orange'];

                    } else if (fourthLineOptions.length > 20) {

                        chosenOptions = rhymesApp.getRandomRhymes(fourthLineOptions, lastWordSecondLine[0], 20);
                    } else {
                        chosenOptions = fourthLineOptions;
                    }

                    rhymesApp.displayRhymeOptions(chosenOptions, 'fourthLineOptions');
                }
            });

            // created all the options and can be added the highlight on click functionality to rhyme options
            $('.rhymeOption').click(function () {
                $(this).toggleClass('selectedRhymeOption');
            });
        });

    // Scroll the user to the Step 2 section smoothly
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".stepTwo").offset().top
    }, 1500);
}

rhymesApp.goToStepThree = function () {
    const userInputThirdLine = $('#thirdLineInput').val();
    const userInputFourthLine = $('#fourthLineInput').val();

    rhymesApp.thirdLine = userInputThirdLine;
    rhymesApp.fourthLine = userInputFourthLine;

    const arrayOfSentences = [rhymesApp.firstLine, rhymesApp.secondLine, rhymesApp.thirdLine, rhymesApp.fourthLine];

    // Scroll the user to the Step Three section smoothly
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".stepThree").offset().top
    }, 1500);

    // function that puts a 4 line poem on the page
    const sentencesContainer = $('#poemDisplayContainer');
    // looping through the array of poem lines
    arrayOfSentences.forEach(sentence => {
        // create sentences in HTML
        const sentenceElement = `<div><p class="poemLine">${sentence}</p></div>`;
        // & display on the page
        sentencesContainer.append(sentenceElement);
    });
}

rhymesApp.restart = function () {
    rhymesApp.firstLine = '';
    rhymesApp.secondLine = '';
    rhymesApp.thirdLine = '';
    rhymesApp.fourthLine = '';

    // we need to clear inputs
    $('#firstLine').val('');
    $('#secondLine').val('');
    $('#thirdLine').val('');
    $('#fourthLine').val('');

    //delete all craeted paragraphs(rhyme options)
    // scroll up to the top of the page
    // we can scroll to the step one section
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".stepOne").offset().top
    }, 1500);
}


rhymesApp.setupUserEvents = function () {
    // create a function that saves user input values from Lines 1 & 2
    // this code will run, when form is submitted
    $('#stepOneForm').on('submit', function (event) {
        // prevents form default behaviour
        event.preventDefault();
        rhymesApp.goToStepTwo();
    });

    // step 3 (reset)
    $('#stepTwoForm').on('submit', function (event) {
        // prevents form default behaviour
        event.preventDefault();
        rhymesApp.goToStepThree();
    });
}

rhymesApp.hamburgerMenu = function () {

    let active1 = false;
    let active2 = false;
    let active3 = false;

    $('.menu').on('click', function () {

        if (!active1) $(this).find('.play').css({
            'transform': 'translate(0px,125px)'
        });
        else $(this).find('.play').css({
            'transform': 'none'
        });
        if (!active2) $(this).find('.envelope').css({
            'transform': 'translate(-70px,90px)'
        });
        else $(this).find('.envelope').css({
            'transform': 'none'
        });
        if (!active3) $(this).find('.user').css({
            'transform': 'translate(-110px,20px)'
        });
        else $(this).find('.user').css({
            'transform': 'none'
        });

        active1 = !active1;
        active2 = !active2;
        active3 = !active3;

    });

}

// CAROUSEL ON INDEX PAGE
var theTitle = 0;
const headerImages = new Array('../assets/word-1.png', '../assets/word-2.png', '../assets/word-3.png', '../assets/word-4.png', '../assets/word-5.png', '../assets/word-6.png');

function rotate() {
    theTitle++;
    if (theTitle == headerImages.length) {
        theTitle = 0;
    }
    document.getElementById('titleImage').src = headerImages[theTitle];
}

// init function to get the app going
rhymesApp.init = function () {
    const url = location.href;
    // checks if url contains "index.html"
    if (url.indexOf('index.html') !== -1) {
        // only run this code on home page.
        setInterval(rotate, 1000);
    }
    rhymesApp.hamburgerMenu();
    rhymesApp.setupUserEvents();
};


// document ready
$(function () {
    rhymesApp.init();
});
