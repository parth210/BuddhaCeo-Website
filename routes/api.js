var express       = require("express");
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var router        = express.Router();


const upload = multer({
  dest: "./public/images/uploads"
});


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
        res.redirect("/admin/home")
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



router.post('/cms/:page/:type', upload.single('img'), function (req, res) {

  if(req.file){
    const tempPath = req.file.path;
    const targetPath ="./public/images/uploads/"+req.params.type+"-"+req.file.originalname;
    fs.rename(tempPath, targetPath, err => {
          if (err) res.send(err);
    })
    req.body.img = req.params.type +"-"+ req.file.originalname
  }

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
          if(key=='rank' || key=='id'){
            return;
          }
          temp = {}
          temp['name'] = key
          temp['value'] = body[key]
          data.push(temp)
        })

          if(body.id){
              console.log(body.id);
              CMS.updateOne({
                'page': req.params.page,
                'type': req.params.type,
                'elements._id': body.id
              }, {
                $set:{
                    "elements.$.rank": body.rank,
                    "elements.$.data": data
                }
              }, (err, found) => {
                if (err) {
                  console.log(err)
                } else {
                  
                  res.redirect('/admin/'+req.params.page)
                }
              })

          } else {

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
                  res.redirect('/admin/'+req.params.page)
                }
              })
        }
    })

})

//csv
router.get('/:type/export', function (req, res) {

  

  model(req.params.type).find({}, (err, found) => {
    if (err) {
      console.log(err)
    } else {
      csv="S.no,"
      if(found.length>0)
      {Object.keys(found[0].toJSON()).forEach((key)=>
      { 
        csv+=key+","
      })
      csv+="\n"
      found.forEach((record,key)=>
      { 
        csv+=(key+1)+",";
        Object.keys(record.toJSON()).forEach((key2)=>
        { 
          csv+=record[key2]+","
        })
        csv+="\n"
      })
    }
      res.setHeader('Content-disposition', 'attachment; filename=export.csv');
      res.set('Content-Type', 'text/csv');
      res.send(csv)
    }
  })

  
      
    
})


module.exports = router;
