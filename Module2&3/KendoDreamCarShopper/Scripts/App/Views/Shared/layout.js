﻿$(function () {
    $("#menu").kendoMenu();
    $.ajax({
        url: "/Api/Makes",
        dataType: "json",
        type: "GET"
    }).done(function (data) {
        data.forEach(function (make) {
            var markup = "<li><a href='/Home/Make/" + make.id + "'>" + make.name + "</a></li>";
            $("#makesMenu").append(markup);
            $("#menu").kendoMenu();
        });
    });
});