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

rhymesApp.getRhyme('dog');

