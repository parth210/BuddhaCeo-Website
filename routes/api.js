var express       = require("express");
var router        = express.Router();




/*                                            Mongoose Schema                            */
var Corporate = require("../models/Corporate");
var Programs = require("../models/Programs");
var Volunteer = require("../models/Volunteer");
var General = require("../models/General");
var Newsletter = require("../models/Newsletter");
var CMS = require("../models/CMS");


function model(type) {
  switch (type){
    case 'corporate':
      return Corporate;
      break;
    case 'programs':
      return Programs;
      break;
    case 'volunteer':
      return Volunteer;
      break;
    case 'general':
      return General;
      break;
    case 'newsletter':
      return Newsletter;
      break;
  }
}

router.get('/api/:type', function (req, res) {
  model(req.params.type).find({}, (err, found) => {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify(found, null, 4));
    }
  })
})



router.get('/api/delete/:type/:id', function (req, res) {
  model(req.params.type).findByIdAndDelete(req.params.id, (err, deleted) => {
    if (err) {
      console.log(err);
    } else {
      res.send("deleted");
    }
  })
})



router.post('/api/:type', function (req, res) {
  var body = req.body;
  var incomplete = [];

  for (var keys in body) { //Checking for missing fields
    if (body[keys] == undefined || body[keys] == '') {
      incomplete.push(keys);
    }
  }
   

  if(incomplete.length===0){
    model(req.params.type).create(body, (err, created) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success")
        res.redirect("/contact")
      }
    })
  } else {
    console.log(incomplete,"empty")
    res.send('Error: '+ incomplete.join(', ') +' are missing!')
  }

})

//                     CMS


router.get('/cms/:type', function (req, res) {
  CMS.find({type: req.params.type}, (err, found) => {
    if (err) {
      console.log(err)
    } else {
      res.send(found)
      }
    })
})




router.get('/cms/delete/:type/:id', function (req, res) {
    CMS.updateMany({type: req.params.type}, {
      $pull: {
        'elements': {
          '_id': req.params.id
        }
      }
    }, (err, deleted) => {
      if (err) {
        console.log(err)
      } else {
        res.send(deleted)
      }
    })
})



router.get('/cms/delete/:type', function (req, res) {
  CMS.deleteOne({type: req.params.type}, (err, deleted) => {
    if (err) {
      console.log(err);
    } else {
      res.send("deleted");
    }
  })
})



router.post('/cms/:page/:type', function (req, res) {

find =  CMS.find({
    'page': req.params.page,
    'type': req.params.type
  }, (err, found) => {

      if (err) {
        console.log(err);
      } else if(!found.length){
          data = {}
          data['page'] = req.params.page
          data['type'] = req.params.type
          data['elements'] = []

          CMS.create(data, (err, created) => {
            if (err) {
              console.log(err);
            }
          })
      }
  })


  find.then(function(){

        //body = req.query
        body = req.body
        data = new Array()

        Object.keys(body).forEach(function (key){
          if(key=='rank'){
            return;
          }
          temp = {}
          temp['name'] = key
          temp['value'] = body[key]
          data.push(temp)
        })

        CMS.updateOne({
          'page': req.params.page,
          'type': req.params.type
        }, {
          $addToSet:{
            "elements":{
              "rank": body.rank,
              "data": data
            }
          }
        }, (err, found) => {
          if (err) {
            console.log(err)
          } else {
            res.send('added')
          }
        })
    })
})


module.exports = router;
