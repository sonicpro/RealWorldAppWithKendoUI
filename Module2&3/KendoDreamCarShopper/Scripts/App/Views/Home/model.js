$(function () {
    var modelId = $.url().segment(-1);
    if (!isNaN(modelId)) {
        var url = "/Api/ModelDetail/" + parseInt(modelId);
        $.get(url, function (model) {
            if (model.images.length > 0) {
                var selectedModelImage = $(".selectedModelImage");
                selectedModelImage.attr("src", model.images[0].lowResolutionUrl);
                selectedModelImage.attr("title", model.images[0].shortDescription);
                selectedModelImage.attr("alt", model.images[0].shortDescription);
                $("#modelThumbnails").kendoListView({
                    dataSource: model.images,
                    template: kendo.template($("#modelThumbnailTemplate").html())
                });
                var $thumbnails = $(".thumbnail");
                $($thumbnails[0]).addClass("selectedThumbnail");
                $thumbnails.click(function (e) {
                    $thumbnails.removeClass("selectedThumbnail");
                    var $thumbnail = $(e.target);
                    $thumbnail.addClass("selectedThumbnail");
                    selectedModelImage.attr("src", $thumbnail.attr("src"));
                    selectedModelImage.attr("title", $thumbnail.attr("title"));
                    selectedModelImage.attr("alt", $thumbnail.attr("alt"));
                });
            }

            var makeImage = $("img.makeImage");
            makeImage.attr("src", model.makeImageUrl);
            makeImage.attr("title", model.makeName);
            makeImage.attr("alt", model.makeName);
            $("#yearAndName").text(`${model.year} ${model.name}`);
            $("#basePrice").text(kendo.toString(model.basePrice, "c"));
            $("#description").text(model.description);
            $("#engineType").text(model.engineType);
            $("#breakHorsepower").text(model.breakHorsepower + " bhp");
            $("#zeroToSixty").text(model.zeroToSixty + " secs");
            $("#topSpeed").text(model.topSpeed + " mph");
        }, "json");
    }
});