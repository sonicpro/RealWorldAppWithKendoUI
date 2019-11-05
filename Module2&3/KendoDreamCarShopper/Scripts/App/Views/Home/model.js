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
            }
        }, "json");
    }
});