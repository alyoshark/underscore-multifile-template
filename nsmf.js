$(function() {
    var UsmfEngine = function() {
        var rendered = "",
            tpl_dict = {};

        var render = function(tpl, data, elem) {
            tpl = window.location.href + tpl;
            if (tpl_dict[tpl] === "") {
                $.get(
                    tpl,
                    function(resp) {
                        tpl_dict[tpl] = _.template(resp);
                        elem.html(tpl_dict[tpl](data));
                        // console.log("Evaled:", tpl);
                    }
                );
            } else {
                console.log("Why templates are never cached?!");
                elem.html(tpl_dict[tpl](data));
            }
        };

        _.each(
            $("script[type=template]"),
            function(x) { tpl_dict[x.src] = ""; }
        );
        return render;
    };

    var data1 = {text: "Oh, hi!"};
    var data2 = {text: "Oh, hello!"};
    var data3 = {text: "Oh, this is awesome!"};

    var ue = UsmfEngine();

    ue("tpl1.html", data1, $("#tpl-test1"));
    ue("tpl2.html", data2, $("#tpl-test2"));
    ue("tpl1.html", data3, $("#tpl-test3"));
});
