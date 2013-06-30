(function (d) {
    "use strict";
    var script, form, setEditable, removeEditable, children = d.body.children;

    setEditable = function (L) {
        for (var c, i = 0, l = L.length; i < l; i++) {
            c = L[i];
            c.setAttribute("contenteditable", "true");
            c.ostyle = c.getAttribute("style");
            setEditable(c.children);
        }
    };

    // revert CKEditor's changes to the dom
    removeEditable = function (L) {
        for (var c, i = 0, l = L.length; i < l; i++) {
            c = L[i];children
            c.removeAttribute("contenteditable");
            c.ostyle ? c.setAttribute("style", c.ostyle) : c.removeAttribute("style");
            removeEditable(c.children);
        }
    };

    setEditable(d.body.children);

    script = d.createElement("script");
    script.src = "/ckeditor/ckeditor.js";
    d.body.appendChild(script);

    form = d.createElement("form");
    form.method = "POST";
    form.action = "/site_files/save/" + location.href.slice(location.href.lastIndexOf("/")+1);
    form.innerHTML = "<input type='hidden' name='html'/><input type='hidden' name='csrf_token'/><input type='submit' value='Save' style='font-size: 22px'/>";
    form.setAttribute("style", "position: absolute; z-index: 9999; right: 10px; top: 10px");
    d.body.appendChild(form);

    form.onsubmit = function (e) {
        var i, a = 6, i, s = CKEDITOR.instances;
        d.body.removeChild(form);
        d.body.removeChild(script);
        d.body.removeChild(document.getElementById("ytCinemaMessage"));
        for (i in s) s[i].destroy();
        while (a--) d.head.removeChild(d.head.lastChild);
        console.log(1);
        removeEditable(d.body.children);
        d.body.removeChild(document.body.lastChild);
        this.firstChild.value = "<html>" + document.documentElement.innerHTML + "</html>";
        d.body.appendChild(form);
        document.getElementsByName("csrf_token")[0].value = csrf;
        this.submit();
    };
}(document));