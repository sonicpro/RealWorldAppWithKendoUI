$(function () {
    var id = parseInt($.url().segment(-1));
    if (!isNaN(id)) {
        $.get("/Api/Makes/" + id, function (response) {
            var makeModel = response;
            $("#makeImage").attr("src", makeModel.imageUrl);
            $("#makeImage").attr("title", makeModel.name);
            $("#makeLocation").text(makeModel.location);
        }, "json")
    }
});