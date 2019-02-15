// get JSON according to the SpaceAPI
var getstatus = function() {
  $.getJSON("https://bdstr.reaktor23.org/spaceapi", function(data) {
    $("#reaktorstatus > #message").removeClass();
    // Check if last update is longer than 2 Minutes old
    if(data.state.open) {
      $("#reaktorstatus > #message").addClass("text-success");
      $("#reaktorstatus > #message").html("Come in, we're open!<br><small class='text-muted'>"+new Date(data.state.lastchange * 1000)+"</small>");
    } else {
      $("#reaktorstatus > #message").addClass("text-danger");
      //$("#reaktorstatus > #message").html(data.state.message);
      $("#reaktorstatus > #message").html("Sorry, we're closed!<br><small class='text-muted'>"+new Date(data.state.lastchange * 1000)+"</small>");
    }
    if($("#apidteails")) {
      $("#apidteails").html("");
      printdetails(data);
    }
    if($("#apijson")) {
      $("#apijson").html(JSON.stringify(data, null, '\t'));
    }
  });
}

var printdetails = function(data) {
  $("#apidteails").append("<div>Last state change</div>")
  $("#apidteails").append("<div>"+new Date(data.state.lastchange*1000)+"</div>")
  $("#apidteails").append("<br/><div>Temperatures</div>")
  data.sensors.temperature.forEach(function(e) {
    $("#apidteails").append("<div>"+e.name+": "+e.value+" "+e.unit+"</div>")
  })
  /*
  $("#apidteails").append("<br/><div>Power circuits</div>")
  data.sensors.power_circuits.forEach(function(e) {
    $("#apidteails").append("<div>"+e.name+": "+e.value+" "+e.unit+"</div>")
  })
  */
}

// Call function on page load
getstatus();
// Refresh status every 10 seconds
window.setInterval(getstatus, 10000);
