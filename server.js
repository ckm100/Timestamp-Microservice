var http = require("http"),
    path = require("path"),
    express = require("express"),
    app = express(),
    moment = require("moment"),
    c,
    decode,
    u;

app.set("json spaces", 5);

app.set('port', (process.env.PORT || 9000))

app.use(express.static(path.join(__dirname, "public")));

app.get("/[0-9]{1,}/", function (req, res) {

    c = moment.unix(+req.url.substring(1, req.url.length));

    res.json({
        "unix": parseInt(req.url.substring(1, req.url.length)),
        natural: c.format("MMMM Do, YYYY")
    });

});

app.get("/([a-zA-Z0-9]*|(%20|\.|\-)[a-zA-Z0-9]*(%20|\.|\-)[a-zA-Z0-9]*)/", function (req, res) {

    decode = decodeURI(req.url.substring(1, req.url.length));
    u = new Date(decode).getTime() / 1000;

    if (/[a-zA-Z](\s|\.|\-)/.test(decode) === false) {

        res.json({
            "unix": null,
            "natural": null
        });

    } else {

        res.json({
            "unix": u,
            "natural": (moment.unix(u).format("MMMM Do, YYYY") === "Invalid date") ? null : moment.unix(u).format("MMMM Do, YYYY")
        });

    }

});

app.listen(app.get('port'), function () {

    console.log("Listening on port ", app.get('port'));

});
