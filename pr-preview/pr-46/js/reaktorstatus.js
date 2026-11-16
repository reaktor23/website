// get JSON according to the SpaceAPI
const dateformat = new Intl.DateTimeFormat('DE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});

var getstatus = function() {
  $.getJSON("https://spaceapi.reaktor23.org", function(data) {
    var lastchange = dateformat.format(new Date(data.state.lastchange * 1000))
    $("#reaktorstatus > #message").removeClass();
    // Check if last update is longer than 2 Minutes old
    if(data.state.open === true) {
      $("#reaktorstatus > #message").addClass("text-success");
      $("#reaktorstatus > #message").html("Come in, we're open!<br><small class='text-muted'>Last change: "+lastchange+"</small>");
    } else {
      $("#reaktorstatus > #message").addClass("text-danger");
      $("#reaktorstatus > #message").html("Sorry, we're closed!<br><small class='text-muted'>Last change: "+lastchange+"</small>");
    }
    if($("#apidteails")) {
      $("#apidteails").html("");
      printdetails(data);
    }
    if($("#apijson")) {
      $("#apijson").html(JSON.stringify(data, null, '\t'));
    }
  }).fail(function() {
      $("#reaktorstatus > #message").addClass("text-warning");
      $("#reaktorstatus > #message").html("💩, something went wrong!<br><small class='text-muted'>Status unknown</small>");
  });
}

var printdetails = function(data) {
  $("#apidteails").append("<div>Last state change</div>")
  $("#apidteails").append("<div>"+new Date(data.state.lastchange*1000)+"</div>")
  $("#apidteails").append("<br/><div>Temperatures</div>")
  data.sensors.temperature.forEach(function(e) {
    $("#apidteails").append("<div>"+e.name+": "+e.value+" "+e.unit+"</div>")
  })
}

// Call function on page load
getstatus();
// Refresh status every 10 seconds
window.setInterval(getstatus, 10000);
