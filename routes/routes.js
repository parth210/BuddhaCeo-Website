var express       = require("express");
var router        = express.Router();
var expressSession = require('express-session');

router.use(expressSession({
  secret: 'tH!$_!$_mY_$3$$!0n_$3cR3T',
  resave: true,
  saveUninitialized: true
}));


var CMS = require("../models/CMS");
var Corporate = require("../models/Corporate");
var Programs = require("../models/Programs");
var Volunteer = require("../models/Volunteer");
var General = require("../models/General");
var Newsletter = require("../models/Newsletter");


router.get("/" , function(req, res) {
	CMS.find({type: 'carousel'}, (err, carousel) => {
		if (err) {
			console.log(err)
		}
		else
		{
			CMS.find({type: 'events'}, (err, events) => {
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
									res.render("home",{carousel,events,resources,testimonial});
								}
							})
						}
					})
				}
			})
		}
	})
})

router.get("/about" , function(req, res) {
	CMS.find({type: 'about_top'}, (err, about_top) => {
		if (err) {
			console.log(err)
		}
		else
		{
			CMS.find({type: 'mentors'}, (err, mentors) => {
				if (err) {
					console.log(err)
				}
				else
				{
					CMS.find({type: 'founders'}, (err, founders) => {
						if (err) {
							console.log(err)
						}
						else
						{
							CMS.find({type: 'apex'}, (err, apex) => {
								if (err) {
									console.log(err)
								}
								else
								{
									CMS.find({type: 'flag'}, (err, flag) => {
										if (err) {
											console.log(err)
										}
										else
										{
											CMS.find({type: 'partner'}, (err, partner) => {
												if (err) {
													console.log(err)
												}
												else
												{
													res.render("about",{about_top,mentors,founders,apex,flag,partner});
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

router.get("/ourprograms" , function(req, res) {
	CMS.find({type: 'events_top'}, (err, events_top) => {
		if (err) {
			console.log(err)
		}
		else
		{
			CMS.find({type: 'w_c'}, (err, w_c) => {
				if (err) {
					console.log(err)
				}
				else
				{
					res.render("programs",{events_top,w_c});
				}
			})
		}
	})
})

router.get("/donate" , function(req, res) {
	CMS.find({type: 'donate_top'}, (err, donate_top) => {
		if (err) {
			console.log(err)
		}
		else
		{
			CMS.find({type: 'donate'}, (err, donate) => {
				if (err) {
					console.log(err)
				}
				else
				{
					res.render("donate",{donate_top,donate});
				}
			})
		}
	})
})

router.get("/corporateprograms" , function(req, res) {
	CMS.find({type: 'corporate_top'}, (err, corporate_top) => {
		if (err) {
			console.log(err)
		}
		else
		{
			res.render("corporate",{corporate_top});
		}
	})
})

router.get("/contact" , function(req, res) {
	CMS.find({type: 'contact_top'}, (err, contact_top) => {
		if (err) {
			console.log(err)
		}
		else
		{
			CMS.find({type: 'email'}, (err, email) => {
				if (err) {
					console.log(err)
				}
				else
				{
					CMS.find({type: 'phone'}, (err, phone) => {
						if (err) {
							console.log(err)
						}
						else
						{
							res.render("contact",{contact_top,email,phone});
						}
					})
				}
			})
		}
	})
})

router.get("/admin/home" , function(req, res) {
	if(req.session.admin=='true'){
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
	} else {
		res.redirect('/admin/login');
	}
})

router.get("/admin/about" , function(req, res) {
	if(req.session.admin=='true'){
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
} else {
	res.redirect('/admin/login');
}
})

router.get("/admin/events" , function(req, res) {
	if(req.session.admin=='true'){
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
} else {
	res.redirect('/admin/login');
}
})

router.get("/admin/corporate" , function(req, res) {
	if(req.session.admin=='true'){
	CMS.find({type: 'corporate_top'}, (err,corporate_top) => {
		if (err) {
			console.log(err)
		}
		else
		{
			res.render("admin_corporate",{corporate_top});
		}
	})
} else {
	res.redirect('/admin/login');
}
})

router.get("/admin/donate" , function(req, res) {
	if(req.session.admin=='true'){
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
} else {
	res.redirect('/admin/login');
}
})


router.get("/admin/contact" , function(req, res) {
	if(req.session.admin=='true'){
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
} else {
	res.redirect('/admin/login');
}
})



router.get("/admin/newsletter" , function(req, res) {
	if(req.session.admin=='true'){
	Newsletter.find({}, (err,newsletter) => {
		if (err) {
			console.log(err)
		} else 	{
			res.render("admin_newsletter",{newsletter});
		}
	})
} else {
	res.redirect('/admin/login');
}
})

router.get("/admin/volunteer" , function(req, res) {
	if(req.session.admin=='true'){
			Volunteer.find({}, (err,volunteer) => {
				if (err) {
					console.log(err)
				} else 	{
					res.render("admin_volunteer",{volunteer});
				}
			})
	} else {
		res.redirect('/admin/login');
	}
})
router.get("/admin/general" , function(req, res) {
	if(req.session.admin=='true'){
	General.find({}, (err,general) => {
		if (err) {
			console.log(err)
		} else 	{
			res.render("admin_general",{general});
		}
	})
	} else {
		res.redirect('/admin/login');
	}
})

router.get("/admin/corporate/response" , function(req, res) {
	if(req.session.admin=='true'){
	Corporate.find({}, (err,corp) => {
		if (err) {
			console.log(err)
		} else 	{
			res.render("corporate_enquiry",{corp});
		}
	})
} else {
	res.redirect('/admin/login');
}
})



router.get("/admin/logout" , function(req, res) {
			req.session.destroy();
			res.redirect('/admin/login');
})


router.post("/admin/login" , function(req, res) {
			console.log(req.body.password);
			if(req.body.password=='Buddha@123!!'){
					req.session.admin='true';
					res.redirect('/admin/home');
			} else {
				res.render('admin_login',{err:true})
			}
})
router.get("/admin/login" , function(req, res) {
	res.render("admin_login",{err:false});
})
module.exports = router;
