
var cfURL = "https://us-central1-cloudylabs.cloudfunctions.net/"

$("#term-submit").submit(function (event) {
    var term = $("#term").val();
    if (term === "") {
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
                appendStatus(data, 0);
                //getStatus(data.status_url);
            } else {
                alert("Invalid response");
            }
        }).fail(function (error) {
            alert(error);
        });
    event.preventDefault();
});

function appendStatus(data, i) {
    //console.log(data);
    if (!data) {
        return;
    }

    if (++i > 30) {
        alert("Too many errors");
        return;
    }

    console.log("Status check #" + i);

    if (data.status === "Failed") {
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
        return;
    } else {
        //TODO: need some form of breaker here
        if (data.status_url) {
            setTimeout(function () {
                getStatus(data.status_url, i);
            }, 500);
        }
    }
}

function getStatus(url, i) {
    $.getJSON(url)
        .done(function (data) {
            if (data) {
                appendStatus(data, i)
            } else {
                alert("Invalid response");
            }
        }).fail(function (error) {
            alert(error);
        });
}
