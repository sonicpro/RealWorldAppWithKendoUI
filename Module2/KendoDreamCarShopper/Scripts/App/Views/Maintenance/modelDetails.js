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
            {
                field: "Order",
                title: "Order",
                width: "60px",
                editor: imageOrderEditor
            },
            {
                field: "ShortDescription",
                title: "Description",
                width: "100px",
                editor: imageDescriptionEditor
            },
            {
                field: "LowResolutionUrl",
                title: "Low Resolution Url",
                editor: imageUrlEditor
            },
            {
                field: "HighResolutionUrl",
                title: "High Resolution Url",
                editor: imageUrlEditor
            },
            {
                command: [
                    {
                        name: "delete",
                        template: $("#commandTemplate").html()
                    }
                ],
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
        model: {},
        deleteImage: function (e) {
            var images = this.get("images");
            var index = images.indexOf(e.data);
            images.splice(index, 1);
        },
        save: save
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

    // kendoGrid.columns "editor" property values:
    function imageOrderEditor(container) {
        $('<input class="imageOrder" name="Order" required validationMessage="Please enter Order #" ' +
            'data-role="numerictextbox" min="1" />')
            .appendTo(container);

        // Create kendoTooltip explicitly, othervise placing is not good for kendoNumericTextBox validation.
        //create tooltipElement element, NOTE: data-for attribute should match editor's name attribute
        var tooltipElement = $('<span class="k-invalid-msg" data-for="Order"></span>');
        //append the tooltip element
        tooltipElement.appendTo(container);
    }

    function imageDescriptionEditor(container) {
        $('<input class="imageDescription" name="ShortDescription" type="text" ' +
            'required validationMessage="Please enter Description" maxlength="25" />')
            .appendTo(container);
    }

    // Passing the fild name through options. Do not forget to double backspaces in regex.
    function imageUrlEditor(container, options) {
        $('<input type="text" name="' + options.field + '" ' +
            'pattern="(?:[\\-\\w/]*/)?(?:[\\-\\w]+).(?:jpg|jpeg|png|gif)(?!(?:\\w|\\W))" ' +
            'required validationMessage="Url is required and must be a valid path" ' +
            'maxlength="1024" />')
            .appendTo(container);
    }

    function save() {
        var validator = $("#modelDetails").kendoValidator()
            .data("kendoValidator");

        if (validator.validate()) {
            $.ajax({
                url: "/Api/Models",
                type: "POST",
                data: JSON.stringify(vm.model),
                contentType: "application/json; charset=UTF-8"
            }).done(function () {
                $("#status").text("Saved Successfully!")
                    .removeClass("error")
                    .addClass("success");
            });
        } else {
            $("status").text("Validation Errors!")
                .removeClass("success")
                .addClass("error");
        }
    }
});

