$(function () {
    var makeImages = new kendo.data.DataSource({
        transport: {
            read: {
                url: "/Api/Makes/",
                dataType: "json"
            }
        }
    });

    $("#makeImages").kendoListView({
        dataSource: makeImages,
        template: kendo.template($("#makesTemplate").html())
    });

    $.get("/Api/ModelImages/", function (result) {
        var vm = kendo.observable({
            modelImages: result
        });
        kendo.bind($("#imagesCarousel"), vm);
    },
    "json");
});