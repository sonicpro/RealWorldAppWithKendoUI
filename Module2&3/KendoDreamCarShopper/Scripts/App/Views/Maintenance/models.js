$(function () {
    $("#models").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: function () {
                        var url = "/Api/Models";
                        var id = parseInt($.url().segment(-1));
                        if (!isNaN(id))
                            url = url + "/" + id;
                        return url;
                    }, type: "GET"
                },
                destroy: {
                    url: "/Api/Models",
                    type: "DELETE"
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { editable: false },
                        name: { editable: false },
                        year: { editable: false },
                        basePrice: { editable: false },
                        makeId: { editable: false },
                        makeName: { editable: false }
                    }
                }
            },
            sort: [{ field: "makeName", dir: "asc" }, { field: "name", dir: "asc" }],
            pageSize: 5,
            group: { field: "makeName" }
        },
        columns: [
            {
                field: "makeName",
                title: "Make",
                groupHeaderTemplate: '#= value #'
            },
            {
                field: "name",
                title: "Model"
            },
            {
                field: "year",
                title: "Year",
                width: "85px",
                attributes: { style: "text-align:right;" }
            },
            {
                field: "basePrice",
                title: "MSRP",
                format: "{0:c0}",
                width: "100px",
                attributes: { style: "text-align:right;" }
            },
            {
                command: [
                    { text: "Detail", click: details },
                    { text: "Delete", click: deleteModel }
                ],
                title: "&nbsp;",
                width: "170px"
            }
        ],
        pageable: true,
        sortable: true,
        toolbar: kendo.template($("#toolbarTemplate").html()),
        editable: true
    });

    // Hack: hide a column which value is also shown in the group header.
    $("#models").data("kendoGrid").hideColumn("MakeName");
});

function details(e) {
    e.preventDefault();
    var model = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = "/Maintenance/ModelDetails/" + model.id + "?makeId=" + model.makeId;
}

function deleteModel(e) {
    if (confirm("Are you sure you want to delete this record?")) {
        var model = this.dataItem($(e.target).closest("tr"));
        var dataSource = $(e.target).closest(".k-grid").data("kendoGrid").dataSource;
        dataSource.remove(model);
        dataSource.sync();
    }
}

function addNewModel() {
    // The current page url is like /Maintenance/Models/{id}, where id - Make.Id.
    // Take it and redirect to model details page using the url like /Mainenance/ModelDetails/0?makeId={id}.
    var makeId = parseInt($.url().segment(-1));
    var addNewModelUrl = "/Maintenance/ModelDetails/0";
    if (!isNaN(makeId)) {
        addNewModelUrl = addNewModelUrl + "?makeId=" + makeId;
    }
    window.location.href = addNewModelUrl;
}
