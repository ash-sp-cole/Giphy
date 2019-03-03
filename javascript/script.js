
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript">
        var keyWords = ["Pheobe", "Chandler", "Monica", "Rachel", "Ross",
            "spongebob"
        ];
        function renderButtons() {
            console.log("render buttons was activated");
            for (var i = 0; i < keyWords.length; i++) {
                var newButton = $("<button>");
                newButton.addClass("btn");
                newButton.addClass("topic-button");
              
                $(newButton).attr('id', 'key-item');
                newButton.text(keyWords[i]);
                $("#button-container").append(newButton);
            }
            $(".topic-button").unbind("click");
            $(".topic-button").on("click", function () {
                $(".gif-image").unbind("click");
                $("#gifSpace").empty();
                $("#gifSpace").removeClass("dotted-border");
                populateGIFdiv($(this).text());
            });
        }
        function addButton(show) {
            console.log("add button function was activated");
            if (keyWords.indexOf(show) === -1) {
                keyWords.push(show);
                $("#button-container").empty();
                renderButtons();
            }
        }
        function populateGIFdiv(show) {
            console.log("populate GIF container  was activated");
            $.ajax({
                url: "https://api.giphy.com/v1/gifs/search?q=" + show +
                    "&api_key=9UilJqWOcr0NaFSL4j9arpheKsuajdXG",
                method: "GET"
            }).then(function (response) {
                response.data.forEach(function (element) {
                    newDiv = $("<div>");
                    newDiv.addClass("individual-gif-container");
                    newDiv.append("<p>Rating: " + element.rating.toUpperCase() +
                        "</p>");
                    var newImage = $("<img src = '" + element.images.fixed_height_still
                        .url + "'>");
                    newImage.addClass("gif-image");
                    newImage.attr("state", "still");
                    newImage.attr("still-data", element.images.fixed_height_still
                        .url);
                    newImage.attr("animated-data", element.images.fixed_height
                        .url);
                    newDiv.append(newImage);
                    $("#gifSpace").append(newDiv);
                });
                $("#gifSpace").addClass("dotted-border");
                $(".gif-image").unbind("click");
                $(".gif-image").on("click", function () {
                    if ($(this).attr("state") === "still") {
                        $(this).attr("state", "animated");
                        $(this).attr("src", $(this).attr("animated-data"));
                    } else {
                        $(this).attr("state", "still");
                        $(this).attr("src", $(this).attr("still-data"));
                    }
                });
            });
        }
        $(document).ready(function () {
            renderButtons();
            $("#submit").on("click", function () {
                console.log("submit was activated via click");
                event.preventDefault();
                addButton($("#gifButtonSpot").val().trim());
                $("#gifButtonSpot").val("");
            });
        });
    </script>