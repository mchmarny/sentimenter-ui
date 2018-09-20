
var cfURL = "https://us-central1-s9-demo.cloudfunctions.net/"

//$("#score").hide();

$("#term-submit").submit(function (event) {

    //$("#score").hide();
    var term = $("#term").val();

    if (term === "") {
        //TODO: show proper alert
        alert("Term required");
        return;
    }

    // reset
    $(".dynamic-data").html("");


    $.getJSON(cfURL + "sentimenter-submit?term=" + term)
        .done(function (data) {
            if (data) {
                //console.log(data);
                $("#term").val("");

                appendStatus(data);
                //getStatus(data.status_url);

            } else {
                alert("Invalid response");
            }
        }).fail(function (error) {
            alert(error);
        });

    event.preventDefault();
});


function appendStatus(data) {

    //console.log(data);

    if (!data) {
        return;
    }

    $("#searchterm").html(data.search_term);
    $("#status").html(data.status);
    $("#rid").html(data.id);
    $("#eon").html(data.created_on);

    if (data.status === "Processed" && data.result) {

        $("#records").html("" + data.result.tweets + " tweets");
        $("#positive").html(data.result.positive);
        $("#negative").html(data.result.negative);
        $("#tottalscore").html(data.result.score);

    } else {
        //TODO: need some form of breaker here
        if (data.status_url) {
            setTimeout(function () {
                getStatus(data.status_url);
            }, 500);
        }
    }

}

function getStatus(url) {
    $.getJSON(url)
        .done(function (data) {
            if (data) {
                appendStatus(data)
            } else {
                alert("Invalid response");
            }
        }).fail(function (error) {
            alert(error);
        });
}



