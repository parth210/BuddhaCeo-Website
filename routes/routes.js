var express       = require("express");
var router        = express.Router();

var CMS = require("../models/CMS");

router.get("/" , function(req, res) {
	res.render("home");
})

router.get("/about" , function(req, res) {
	res.render("about");
})

router.get("/ourprograms" , function(req, res) {
	res.render("programs");
})

router.get("/donate" , function(req, res) {
	res.render("donate");
})

router.get("/corporateprograms" , function(req, res) {
	res.render("corporate");
})

router.get("/contact" , function(req, res) {
	res.render("contact");
})

router.get("/admin/home" , function(req, res) {
	CMS.find({type: 'carousel'}, (err, carousel) => {
		if (err) {
			console.log(err)
		} else {
			res.render("admin_home",{carousel:carousel});
			}
		})
})

module.exports = router;
