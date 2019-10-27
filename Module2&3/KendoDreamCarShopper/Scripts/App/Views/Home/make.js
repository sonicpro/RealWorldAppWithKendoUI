$(function () {
    var id = parseInt($.url().segment(-1));
    if (!isNaN(id)) {
        $.get("/Api/Makes/" + id, function (response) {
            var makeModel = response;
            $("#makeImage").attr("src", makeModel.imageUrl);
            $("#makeImage").attr("title", makeModel.name);
            $("#makeLocation").text(makeModel.location);
        }, "json")

        var makeModelDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/Api/Models/" + id,
                    dataType: "json"
                }
            },
            autoBind: true
        });

        $("#makeModels").kendoListView({
            dataSource: makeModelDataSource,
            template: kendo.template($("#makeModelsTemplate").html())
        });
    }
});