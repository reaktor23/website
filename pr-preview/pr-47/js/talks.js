var gettalks = function() {
    var converter = new showdown.Converter()
    // Query Talks from Github
    $.get("https://api.github.com/repos/reaktor23/talks/issues?state=open", function(talk){
        // empty the Talks div
        console.log(talk)
        $("tbody").empty(); 
        $.each(talk, function(t){
            labels = ""
            $.each(talk[t].labels,function(l) {
                labels += "<span class='badge badge-primary' style='margin-right:.5em'>"+talk[t].labels[l].name+"</span>"
            })
            $("tbody").append("<tr><td><a href='"+
                talk[t].html_url+"'>" + 
                talk[t].title + " <i class='fa fa-external-link' aria-hidden='true'></i></a></td><td>"+ 
                converter.makeHtml(talk[t].body) + "</td><td>"+
                talk[t].assignees.map(function(e){return e.login}).join()+"</td><td>"+ labels +"</td></tr>")
        })
    })
}
if($(".talks").length) {
    gettalks();
}
