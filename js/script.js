console.clear();

//Create a function to send the base search request

function characterSearch(searchString) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://swapi.co/api/people/?search=" + encodeURIComponent(searchString),
        "method": "GET"
    };
    $.ajax(settings).done(function (res) {
        return new characterDetails(res.results[0]);
    });
}


//Create a constructor that will build character previews

function characterDetails(characterObject) {
    console.log(characterObject);
    this.info = {
        id: characterObject.id,
        name: characterObject.name,
        height: characterObject.height,
        mass: characterObject.mass,
        skin_color: characterObject.skin_color,
        gender: characterObject.gender

    };

    this.createElements = function () {
        var source = $("#character-template").html();
        var template = Handlebars.compile(source);
        var context = {
            id: this.info.id,
            name: this.info.name,
            height: this.info.height,
            mass: this.info.mass,
            skin_color: this.info.skin_color,
            gender: this.info.gender

        };
        var html = template(context);
        $('.content').prepend(html);
    };

    this.createElements();
}


// Create a function to search for characters

function relatedSearch(id) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://swapi.co/api/people/" + id,
        "method": "GET",
        "processData": false,
        "data": "{}"
    }

    $.ajax(settings).done(function (res) {
        $('.content').html('');
        for (var i = 0; i < 5; i++) {
            new characterDetails(res[i]);
        }
    });
}

// Handle the form submit

$('#btnSearch').click(function (e) {
    e.preventDefault();
    $("#show_query").hide('slow')
    $("#search_result").show('slow')
    var searchString = $('#search-field').val();
    $('#search-field').val('');
    characterSearch(searchString);
});

$('#btnQuery').click(function (e) {
    e.preventDefault();
    $("#show_query").hide('slow')
    $("#search_result").show('slow')
    var searchString = $('#query-field').val();
    $('#query-field').val('');
    characterSearch(searchString);
});


// Use event delegation to link the related search links to the appropriate function

$('.container').on('click', '.related-search-link', function () {
    var characterId = $(this).attr('data-id');
    relatedSearch(characterId);
});

