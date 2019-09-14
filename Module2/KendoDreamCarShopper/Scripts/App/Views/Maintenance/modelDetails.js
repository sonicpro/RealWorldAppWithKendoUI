$(function () {
    $("#make").kendoComboBox();

    $("#year").kendoNumericTextBox({
        decimals: 0,
        format: "g"
    });

    $("#breakHorsepower").kendoNumericTextBox({
        decimals: 0,
        format: "g"
    });

    $("#zeroToSixty").kendoNumericTextBox({
        decimals: 2,
        format: "n2",
        step: 0.01
    });

    $("#topSpeed").kendoNumericTextBox({
        decimals: 0,
        format: "g"
    });

    $("#basePrice").kendoNumericTextBox({
        format: "c"
    });

    $("#images").kendoGrid({
        columns: [
            { field: "Order", title: "Order", width: "60px" },
            { field: "ShortDescription", title: "Description", width: "100px" },
            { field: "LowResolutionUrl", title: "Low Resolution Url" },
            { field: "HighResolutionUrl", title: "High Resolution Url" },
            {
                command: ["destroy"],
                title: "&nbsp;",
                width: "88px"
            }
        ],
        editable: true,
        sortable: true,
        toolbar: ["create"]
    })

    var url = "/Api/Models"
    var id = parseInt($.url().segment(-1));
    if (!isNaN(id)) {
        url = url + "/" + id
    }
    var data = {};
    var query = $.url().attr("query");
    if (query) {
        data.makeId = parseInt(query.slice(query.indexOf("=") + 1));
    } else {
        // We need a result of "ModelDetailsViewModel" type, therefore explicitly provide two arguments to the MVC action.
        data.makeId = null;
    }

    var vm = kendo.observable({
        model: {}
    });

    $.ajax({
        url: url,
        type: "GET",
        data: data,
        dataType: "json"
    }).done(function (model) {
        vm.set("model", model);
        kendo.bind($("#modelDetails"), vm);
    });

    $("body").kendoValidator();
});