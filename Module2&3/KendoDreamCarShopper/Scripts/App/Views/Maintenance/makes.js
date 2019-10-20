$(function () {
    $("#makes").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: "/Api/Makes",
                    type: "GET"
                },
                update: {
                    url: "/Api/Makes",
                    type: "POST"
                },
                create: {
                    url: "/Api/Makes",
                    type: "POST"
                },
                destroy: {
                    url: "/Api/Makes",
                    type: "DELETE"
                }
            },
            pageSize: 5,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        name: {
                            validation: {
                                pattern: "[\\w\\d ]{2,}",
                                validationMessage: "Please enter the car maker name (at least two characters)."
                            }
                        },
                        location: {
                            validation: {
                                pattern: "[\\w\\d, ]{2,}",
                                validationMessage: "Please enter Headquarters (at least two characters)."
                            }
                        },
                        imageUrl: {
                            validation: {
                                pattern: "(?:[\\-\\w/]*/)?(?:[\\-\\w]+).(?:jpg|jpeg|png|gif)(?!(?:\\w|\\W))",
                                validationMessage: "Please enter image Url."
                            }
                        }
                    }
                }
            }
        },
        columns: [
            {
                field: "name",
                title: "Make",
                width: "120px"
            },
            {
                field: "location",
                title: "Headquarters",
                width: "200px"
            },
            {
                field: "imageUrl",
                title: "Image Location"
            },
            {
                command: [
                    "edit",
                    "destroy",
                    { text: "Models", click: models }
                ],
                title: "&nbsp;",
                width: "240px"
            }
        ],
        sortable: true,
        pageable: {
            pageSizes: true|[5, 10]
        },
        editable: "popup",
        toolbar: [ "create" ]
    });

    function models(e) {
        // this. - is a kendoGrid
        // dataItem() method takes jQuery object that represent a table row and returns a kendo.data.Model instance to which the table row is bound.
        // BTW dataSource contains instances of kendo.data.Model when the schema.model setting is specified.
        var model = this.dataItem($(e.currentTarget).closest("tr"));
        window.location.href = "/Maintenance/Models/" + model.id;
    }
});