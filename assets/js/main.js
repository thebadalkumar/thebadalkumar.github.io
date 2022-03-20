function objectifyForm(formArray) {
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i].name] = formArray[i].value;
    }
    return returnArray;
}

function formatDatetime(datetime) {

    var mydate = new Date(datetime);
    var thedate = mydate.getDate();
    var month = mydate.getMonth();
    var year = mydate.getFullYear();

    if (month + 1 < 10) {
        month = "0" + (month + 1);
    }

    if (thedate < 10) {
        thedate = "0" + thedate;
    }

    return year + "/" + month + "/" + thedate;
}

function projectSection(data) {
    var HTML = "";
    var section = $("#project-section");
    for (var i in data) {
        HTML += "<div class='col-lg-3 col-md-6 col-sm-12 mb-4'>\
                    <div class='card'>\
                        <div class='bg-image hover-overlay ripple' data-mdb-ripple-color='light'>\
                            <img src='https://mdbootstrap.com/img/new/standard/nature/002.jpg' class='img-fluid' />\
                            <a href='" + data[i]["url"] + "'>\
                                <div class='mask' style='background-color: rgba(251, 251, 251, 0.15);'></div>\
                            </a>\
                        </div>\
                        <div class='card-body'>\
                            <h5 class='card-title'>" + data[i]["title"] + "</h5>\
                            <p class='card-text'>" + data[i]["content"] + "</p>\
                            <a href='" + data[i]["url"] + "' class='btn btn-primary'>View Project</a>\
                        </div>\
                    </div>\
                </div>";
    }
    section.append(HTML);
}

function skillSection(data) {
    var HTML = "";
    var section = $("#skill-section");
    for (var i in data) {
        HTML += "<div class='col-lg-3 col-md-6 col-sm-12 mb-4'>\
                    <div class='card'>\
                        <div class='card-body skill-col'>\
                            <div class='col-4 alignleft'>" + data[i]["name"] + "</div>\
                            <div class='col-4 alignright'><img src='assets/images/skills/" + data[i]["image"] + "' height='25px'></div>\
                        </div>\
                    </div>\
                </div>";
    }
    section.append(HTML);
}

function blogSection(data) {
    var HTML = "";
    var section = $("#blog-section");
    for (var i in data) {
        HTML += "<div class='col-lg-3 col-md-6 col-sm-12 mb-4'>\
                    <div class='card'>\
                        <div class='bg-image hover-overlay ripple' data-mdb-ripple-color='light'>\
                            <img src='https://mdbootstrap.com/img/new/standard/nature/002.jpg' class='img-fluid' />\
                            <a href='" + data[i]["id"] + "'>\
                                <div class='mask' style='background-color: rgba(251, 251, 251, 0.15);'></div>\
                            </a>\
                        </div>\
                        <div class='card-body'>\
                            <h5 class='card-title'>" + data[i]["title"] + "</h5>\
                            <p class='card-text'>" + data[i]["body"] + "</p>\
                            <a href='" + data[i]["id"] + "' class='btn btn-primary'>Read More</a>\
                        </div>\
                        <div class='card-footer text-muted'>\
                            <div class='col-4 alignleft'><i class='mdi mdi-calendar'></i> " + data[i]["created"] + "</div>\
                            <div class='col-4 aligncenter'><i class='mdi mdi-eye'></i> 100</div>\
                            <div class='col-4 alignright'><i class='mdi mdi-comment'></i> " + data[i]["comments"] + "</div>\
                        </div>\
                    </div>\
                </div>";
    }
    section.append(HTML);
}

function formSubmit(frm, url, respEle) {
    var data = objectifyForm(frm.serializeArray());
    console.log(data);
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function(data) {
            if (!data["err"]) {
                frm.trigger("reset");
            }
            respEle.html(data["message"]); // we will always recieve err report and one message data in json response {"err":True, "message":message}
        },
        error: function() {
            console.log("err");
        }
    });
};
// Menu Buttons
const yOffset = -90;

function scrollToEle(goto_id) {
    const y = $("#" + goto_id).prev()[0].getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
}

$("#goto-home").click(function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
$("#goto-about").click(function() {
    scrollToEle("about-section");
});
$("#goto-projects").click(function() {
    scrollToEle("project-section");
});
$("#goto-blogs").click(function() {
    scrollToEle("blog-section");
});
$("#goto-contact").click(function() {
    scrollToEle("contact-section");
});

// Add Active Class to Menu
$(function() {
    $('.nav-link-cus').on('click', function(e) {
        e.preventDefault()
        oldObjChild = $('.active > a'); //gets active nav-item child nav-link
        oldObj = $('.active'); //gets the active nav-item
        oldObj.removeClass('active'); //remove active from old nav-item
        $(this).parent().addClass('active'); //set the active class on the nav-item that called the function
    });
});