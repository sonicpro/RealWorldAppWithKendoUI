 $(function () {
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

     var url =  "/Api/Models"
     var id = parseInt($.url().segment(-1));
     if (!isNaN(id)) {
         url = url + "/" + id
     }
     var data = {};
     var query = $.url().attr("query");
     if (query) {
         data.makeId = parseInt(query.slice(query.indexOf("=") + 1));
     }

     var vm = kendo.observable({
         year: 0,
         model: "",
         breakHorsepower: 0,
         zeroToSixty: 0,
         topSpeed: 0,
         basePrice: 0,
         description: ""
     });

     $.ajax({
         url: url,
         type: "GET",
         data: data,
         dataType: "json"
     }).done(function (model) {
         vm.set("year", model.Year);
         vm.set("model", model.Name);
         vm.set("breakHorsepower", model.BreakHorsepower);
         vm.set("zeroToSixty", model.ZeroToSixty);
         vm.set("topSpeed", model.TopSpeed);
         vm.set("basePrice", model.BasePrice);
         vm.set("description", model.Description);
         });

     kendo.bind($("#modelDetails"), vm);
});