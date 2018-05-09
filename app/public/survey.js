// Chosen CSS
    var config = {
      ".chosen-select": {},
      ".chosen-select-deselect": {
        allow_single_deselect: true
      },
      ".chosen-select-no-single": {
        disable_search_threshold: 10
      },
      ".chosen-select-no-results": {
        no_results_text: "Uh-oh, nothing found!"
      },
      ".chosen-select-width": {
        width: "95%"
      }
    };

    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }

    // Capture the form inputs
    $("#submit").on("click", function(event) {
      event.preventDefault();

      // Form validation
      function validateForm() {
        var isValid = true;
        $(".form-control").each(function() {
          if ($(this).val() === "") {
            isValid = false;
          }
        });

        $(".chosen-select").each(function() {

          if ($(this).val() === "") {
            isValid = false;
          }
        });
        return isValid;
      }

      // If all required fields are filled out
      if (validateForm()) {
        // Create an object for the user's data
        var userData = {
          name: $("#name").val(),
          photo: $("#photo").val(),
          scores: [
            $("#q1").val(),
            $("#q2").val(),
            $("#q3").val(),
            $("#q4").val(),
            $("#q5").val(),
            $("#q6").val(),
            $("#q7").val(),
            $("#q8").val(),
            $("#q9").val(),
            $("#q10").val()
          ]
        };

        // AJAX post the data to the friends API.
        $.post("/api/friends", userData, function(data) {

          // Grab the result from the AJAX post to display the best match's name and photo.
          $("#match-name").text(data.name);
          $("#match-img").attr("src", data.photo);

          // The modal displays the best match
          $("#results-modal").modal("toggle");

        });

      //Otherwise the following message will appear if the user fails to respond to all questions.
      } else {
        alert("Please respond to all the questions before submitting!");
      }
    });