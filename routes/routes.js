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
			CMS.find({type: 'events'}, (err, events) => {
				if (err) {
					console.log(err)
				}
				else
				{
					CMS.find({type: 'ourwork'}, (err, ourwork) => {
						if (err) {
							console.log(err)
						}
						else
						{
							CMS.find({type: 'parabelowourwork'}, (err, parabelowourwork) => {
								if (err) {
									console.log(err)
								}
								else
								{
									CMS.find({type: 'four_cards'}, (err, four_cards) => {
										if (err) {
											console.log(err)
										}
										else
										{
											CMS.find({type: 'testimonial'}, (err, testimonial) => {
												if (err) {
													console.log(err)
												}
												else
												{
													CMS.find({type: 'resources'}, (err, resources) => {
														if (err) {
															console.log(err)
														}
														else
														{
															res.render("admin_home",{carousel,events,ourwork,pbow:parabelowourwork,four_cards,testimonial,resources});
														}
													})
												}
											})
										}
									})
								}
							})
						}
					})
				}
			})
			
			}
		})
})

router.get("/admin/about" , function(req, res) {
	CMS.find({type: 'about_top'}, (err,about_top) => {
		if (err) {
			console.log(err)
		}
		else
		{
			CMS.find({type: 'mentors'}, (err,mentors) => {
				if (err) {
					console.log(err)
				}
				else
				{
					CMS.find({type: 'founders'}, (err,founders) => {
						if (err) {
							console.log(err)
						}
						else
						{
							CMS.find({type: 'apex'}, (err,apex) => {
								if (err) {
									console.log(err)
								}
								else
								{
									CMS.find({type: 'flag'}, (err,flag) => {
										if (err) {
											console.log(err)
										}
										else
										{
											CMS.find({type: 'partner'}, (err,partner) => {
												if (err) {
													console.log(err)
												}
												else
												{
													res.render("admin_about",{about_top,mentors,apex,flag,founders,partner});
												}
											})
										}
									})
								}
							})
						}
					})
				}
			})

		}
	})
})
router.get("/admin/events" , function(req, res) {
	CMS.find({type: 'w_c'}, (err,w_c) => {
		if (err) {
			console.log(err)
		}
		else
		{
			CMS.find({type: 'events_top'}, (err,events_top) => {
				if (err) {
					console.log(err)
				}
				else
				{
					res.render("admin_events",{w_c,events_top});
				}
			})
		}
	})
})
router.get("/admin/corporate" , function(req, res) {
	CMS.find({type: 'corporate_top'}, (err,corporate_top) => {
		if (err) {
			console.log(err)
		}
		else
		{
			res.render("admin_corporate",{corporate_top});
		}
	})
})
router.get("/admin/donate" , function(req, res) {
	CMS.find({type: 'donate'}, (err,donate) => {
		if (err) {
			console.log(err)
		}
		else
		{
			CMS.find({type: 'donate_top'}, (err,donate_top) => {
				if (err) {
					console.log(err)
				}
				else
				{
					res.render("admin_donate",{donate,donate_top});
				}
			})
		}
	})
})
router.get("/admin/contact" , function(req, res) {
	CMS.find({type: 'email'}, (err,email) => {
		if (err) {
			console.log(err)
		}
		else
		{
			CMS.find({type: 'phone'}, (err,phone) => {
				if (err) {
					console.log(err)
				}
				else
				{
					CMS.find({type: 'contact_top'}, (err,contact_top) => {
						if (err) {
							console.log(err)
						}
						else
						{
							res.render("admin_contact",{email,phone,contact_top});
						}
					})
				}
			})
		}
	})
})
module.exports = router;
