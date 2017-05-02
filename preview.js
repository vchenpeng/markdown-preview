function getParameterByName(e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var t = new RegExp("[\\?&]" + e + "=([^&#]*)"),
    n = t.exec(location.search);
    return null == n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
}
function getCookie(e) {
    for (var t = document.cookie,
    n = t.split(";"), o = 0; o < n.length; o++) {
        var i = n[o].split("=");
        if ($.trim(i[0]) == e) return i[1] && i[1].length ? i[1] : null
    }
    return !1
}
function postMessage(e) {
    //window.parent && window.parent.postMessage && window.parent.postMessage(e, "*")
}
$(function () {
    var q = window.location.search.slice(1) || '404';
    window.loadmd = e;
    function e(q) {
        var e = "./?key=" + q;
        t = getParameterByName("version");
        e && (t && (e = e + "&version=" + t), $.get(e,
        function (t) {
            var s = CryptoJS.AES.decrypt(t, "aes").toString(CryptoJS.enc.Utf8);
            $(".markdown-body").html(mdc.render(s));
        }).error(function (e) {
            q = 'NDA0';
            window.loadmd(q);
        }))
    }
    e(q);
    window.preview = function (e) {
        $.get(e,
        function (e) {
            mdc.init(e, !1)
        })
    },
    $(".markdown-body").delegate("a", "click",
    function (e) {
        var t = $(e.target),
        n = e.target,
        o = window.location;
        if ("" !== n.hash) {
            if (!n.origin && 0 === n.href.indexOf(o.origin)) return;
            if (n.origin === o.origin) return
        }
        t.attr("target", "_blank")
    }),
    $("body").on("keydown",
    function (e) {
        8 != e.keyCode && 46 != e.keyCode || /INPUT|SELECT|TEXTAREE/i.test(e.target.tagName) || e.preventDefault()
    })
});