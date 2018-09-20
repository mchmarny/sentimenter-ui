
var cfURL = "https://us-central1-s9-demo.cloudfunctions.net/"

$("#term-submit").submit(function (event) {

    var term = $("#term").val();

    if (term === "") {
        //TODO: show proper alert
        alert("Term required")
        return;
    }

    $.getJSON(cfURL + "sentimenter-submit?term=" + term)
        .done(function (data) {
            if (data) {
                console.log(data);

                //getStatus(data.status_url);

            } else {
                alert("Invalid response");
            }
        }).fail(function (error) {
            alert(error);
        });

    event.preventDefault();
});


// function getStatus(url) {

//     $.getJSON(url)
//         .done(function (data) {
//             if (data) {
//                 console.log(data.status);
//                 return data;
//             } else {
//                 alert("Invalid response");
//             }
//         }).fail(function (error) {
//             alert(error);
//         });

// }



