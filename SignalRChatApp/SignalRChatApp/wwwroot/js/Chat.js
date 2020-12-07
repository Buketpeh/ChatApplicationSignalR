"use strict"
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
//disable sen button untill connection is established
$("#btnSend").attr("disabled", true);

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt").replace(/>/g, "&gt;");
    var encodeMsg = user + " : " + msg;
    $("#messageList").prepend("<li>" + encodeMsg + "</li>");

});

connection.start().then(function () {
    $("#btnSend").attr("disabled", false);

}).catch(function (err) {
  return alert(err.toString());
});

$("#btnSend").on("click", function (event) {
    var user = $("#txtUserName").val();
    var message = $("#txtMessage").val();

    if (user != "" && message != "") {
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return alert(err.toString())
        });
        event.preventDefault();
    }

});
