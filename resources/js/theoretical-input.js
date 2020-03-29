
function nextline_onclick() {
    var lines = document.getElementById("input");
    for (var i = 0; i < lines.childNodes.length; i++) {
        if (lines.childNodes[i].className === "content_blur") {
            lines.childNodes[i].className="";
            break;
        }
    }
}

function reset_onclick() {
    var lines = document.querySelectorAll('#input p');
    lines.forEach(node => node.className = "");
    lines.forEach((line, i) => {
        if(i > 0) {
            line.className="content_blur";
        }
    });
}