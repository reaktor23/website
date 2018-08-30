// get JSON according to the SpaceAPI
var getstatus = function() {
  $.getJSON("https://bdstr.reaktor23.org/spaceapi", function(data) {
    $("#reaktorstatus > #message").removeClass();
    var timeout = new Date().valueOf() - data.state.lastchange > 120;
    if(data.state.open == "open" && !timeout) {
      $("#reaktorstatus > #message").addClass("text-success");
      $("#reaktorstatus > #message").html(data.state.message);
    }
    else if(data.state.open == "closed" && !timeout) {
      $("#reaktorstatus > #message").addClass("text-danger");
      $("#reaktorstatus > #message").html(data.state.message);
    }
    else {
      $("#reaktorstatus > #message").addClass("text-warning");
      $("#reaktorstatus > #message").html("Not sure, better contact us first!");
    }
    if($("#apidteails")) {
      $("#apidteails").html("");
      printdetails(data);
    }
    if($("#apijson")) {
      $("#apijson").html(JSON.stringify(data));
    }
  });
}

var printdetails = function(data) {
  $("#apidteails").append("<div>Last refresh</div>")
  $("#apidteails").append("<div>"+new Date(data.state.lastchange)+"</div>")
  $("#apidteails").append("<br/><div>Temperatures</div>")
  data.sensors.temperatures.forEach(function(e) {
    $("#apidteails").append("<div>"+e.name+": "+e.value+" "+e.unit+"</div>")
  })
  $("#apidteails").append("<br/><div>Power circuits</div>")
  data.sensors.power_circuits.forEach(function(e) {
    $("#apidteails").append("<div>"+e.name+": "+e.value+" "+e.unit+"</div>")
  })
}

// Call function on page load
getstatus();
// Refresh status every 10 seconds
window.setInterval(getstatus, 10000);
