const rhymesApp = {
    // apiRequestSuccessCounter: 0,
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

rhymesApp.displayRhymeOptions = function(options, containerID) {
    
    const container = $(`#${containerID}`);

    options.forEach(option => {
        const optionElement = `<div><p>${option}</p></div>`;
        container.append(optionElement);
    });
}

rhymesApp.goToStepTwo = function() {
    // get user input and saves it in a variable
    const userInputFirstLine = $('#firstLine').val();
    const userInputSecondLine = $('#secondLine').val();

    // extracts & saves the last words from the user input strings 
    const lastWordFirstLine = userInputFirstLine.split(" ").splice(-1);
    const lastWordSecondLine = userInputSecondLine.split(" ").splice(-1);

    // saving both words in array
    const words = [lastWordFirstLine, lastWordSecondLine];

    // passing "rhymesApp.getRhyme" function above and maping through an array
    const wordPromises = words.map(rhymesApp.getRhyme);

    console.log(wordPromises);

    $.when(...wordPromises)
        .then((...result) => {
            console.log(result);

            result.forEach(result => {
                let response = result[0];
                let chosenOptions = [];

                // THIRD LINE CONTENTS
                if (response.word === lastWordFirstLine[0]) {
                    const thirdLineOptions = response.rhymes.all;
                
                    if (thirdLineOptions.length === 0) {
                        chosenOptions = ['Orange'];
                    } else if (thirdLineOptions.length > 20) {
                        chosenOptions = thirdLineOptions.slice(0, 20);
                    } else {
                        chosenOptions = thirdLineOptions;
                    }
                    console.log('third line chosen options', chosenOptions);

                    rhymesApp.displayRhymeOptions(chosenOptions, 'thirdLineOptions');
                };







                // FOURTH LINE CONTENTS
                if (response.word === lastWordSecondLine[0]) {
                    const fourthLineOptions = response.rhymes.all;
                    
                    if (fourthLineOptions.length === 0) {
                        chosenOptions = ['Orange'];
                    } else if (fourthLineOptions.length > 20) {
                        chosenOptions = fourthLineOptions.slice(0, 20);
                    } else {
                        chosenOptions = fourthLineOptions;
                    }
                    console.log('fourth line chosen options', chosenOptions);

                    rhymesApp.displayRhymeOptions(chosenOptions, 'fourthLineOptions');
                }






            });
        });

    console.log("SOMEHOW RUNNING");
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".stepTwo").offset().top
    }, 1500);
    // choose random up to 20 words for third line & for fourth 
    console.log('Blabediiiiiiiiiiiiiiiii');
    console.log(rhymesApp.thirdLineOptions);
    console.log(rhymesApp.fourthLineOptions);
    console.log('Blabediiiiiiiiiiiiiiiii');
    // if (rhymesApp.thirdLineOptions.length)


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
        rhymesApp.goToStepTwo();
    });
    // STEP 2
    // extend first step section & show second step section
    // $('#submitStepOne').on('click', function() {
    //     console.log('submit button click runs')
    //     rhymesApp.goToStepTwo();
    // });
    

    // STEP 3 (RESET)
}


// 2
// rhymesApp.getRhyme(lastWordFirstLine);
// rhymesApp.getRhyme(lastWordSecondLine);


// CAROUSEL ON INDEX PAGE
var theTitle = 0;
const headerImages = new Array('./assets/word-1.png', './assets/word-2.png', './assets/word-3.png', './assets/word-4.png', './assets/word-5.png', './assets/word-6.png' );

function rotate() {
    theTitle++;
    if (theTitle == headerImages.length) {
        theTitle = 0;
    }
    document.getElementById('titleImage').src = headerImages[theTitle];
}



// init function to get the app going
rhymesApp.init = function () {
    rhymesApp.setupUserEvents();
    // rhymesApp.goToStepTwo();
    // rhymesApp.goToStepThree();
};


// document ready
$(function () {
    // setInterval(rotate, 1 * 800);
    rhymesApp.init();
});

