var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    multer        = require("multer"),
    routes        = require("./routes/routes");


//                 API WITH MONGODB BELOW
var api      = require("./routes/api");
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://cluster0.cmgg5.mongodb.net/ceo?retryWrites=true&w=majority', {user: 'ceo', pass: 'jcb123'});
var db = mongoose.connection;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


app.use(routes);
app.use(api);

app.listen(3000, function() {
  console.log('BudhaCeo app has started on port 3000');
});
