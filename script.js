const rhymesApp = {

    firstLineWord: '',
    secondLineWord: '',
    thirdLineOptions: [],
    fourthLineOptions: [],

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
rhymesApp.displayRhymeOptions = function(options, containerID) {
    // creating container constant
    const container = $(`#${containerID}`);
    // looping through an array & adding elements to display rhyme options
    options.forEach(option => {
        const optionElement = `<p>${option}</p>`;
        container.append(optionElement);
    });
}

// function running on form submit
rhymesApp.goToStepTwo = function() {
    // gets user input (first two sentences) and saves it in a variable
    const userInputFirstLine = $('#firstLine').val();
    const userInputSecondLine = $('#secondLine').val();

    // save lines values to display later
    rhymesApp.firstLine = userInputFirstLine;
    rhymesApp.secondLine = userInputSecondLine;


    // extracts & saves the last words from the user input strings 
    const lastWordFirstLine = userInputFirstLine.split(" ").splice(-1);
    const lastWordSecondLine = userInputSecondLine.split(" ").splice(-1);

    // saving both words in array
    const words = [lastWordFirstLine, lastWordSecondLine];

    // calling rhymesApp.getRhyme function to 
    const wordPromises = words.map(rhymesApp.getRhyme);
    // spreading wordPromises array
    $.when(...wordPromises)
        .then((...result) => {

            result.forEach(result => {
                let response = result[0];
                let chosenOptions = [];

                // THIRD LINE CONTENTS
                if (response.word === lastWordFirstLine[0]) {
                    const thirdLineOptions = response.rhymes.all;
                
                    if (thirdLineOptions.length === 0) {
                        chosenOptions = ['Orange'];
                    // choose random up to 20 words for third line
                    } else if (thirdLineOptions.length > 20) {
                        chosenOptions = thirdLineOptions.slice(0, 20);
                    } else {
                        chosenOptions = thirdLineOptions;
                    }

                    rhymesApp.displayRhymeOptions(chosenOptions, 'thirdLineOptions');
                };

                // FOURTH LINE CONTENTS
                if (response.word === lastWordSecondLine[0]) {
                    const fourthLineOptions = response.rhymes.all;
                    
                    if (fourthLineOptions.length === 0) {
                        chosenOptions = ['Orange'];
                    // choose random up to 20 words for fourth line
                    } else if (fourthLineOptions.length > 20) {
                        chosenOptions = fourthLineOptions.slice(0, 20);
                    } else {
                        chosenOptions = fourthLineOptions;
                    }

                    rhymesApp.displayRhymeOptions(chosenOptions, 'fourthLineOptions');
                }
            });
        });

    $([document.documentElement, document.body]).animate({
        scrollTop: $(".stepTwo").offset().top
    }, 1500);


    // create word options in HTML


    // add word hightlight functionality using $(this).toggleClass('selectedRhymeOption') OR css active
}

rhymesApp.goToStepThree = function () {
    console.log("goToStepThree runs");


}

rhymesApp.restart = function () {

}


rhymesApp.setupUserEvents = function() {
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


// CAROUSEL ON INDEX PAGE
var theTitle = 0;
const headerImages = new Array('../assets/word-1.png', '../assets/word-2.png', '../assets/word-3.png', '../assets/word-4.png', '../assets/word-5.png', '../assets/word-6.png' );

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
    
    rhymesApp.setupUserEvents();
    // rhymesApp.goToStepTwo();
    // rhymesApp.goToStepThree();

    // console.log('location');
    // console.log(location.href);
   


};


// document ready
$(function () {
    rhymesApp.init();
});

