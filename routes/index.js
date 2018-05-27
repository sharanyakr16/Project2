var express = require('express');
var router = express.Router();
mongodb = require('mongodb');

var mongoDBURI = process.env.MONGODB_URI || 'mongodb://sharanya16:sAsh5+enkA@ds225840.mlab.com:25840/heroku_mgjkmjm6';//connect to mongoDB


var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Routes collection




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// router.post('/storeData', function(req, res, next) {
// //expecting data variable called order--retrieve value using body-parser
//     //retrieve the data associated with order
//     var value_name = req.body.firstname;
//     var value_name_2 = req.body.lastname;
//     // var value_name = req.body.address;
//     // var value_name_2 = req.body.address2;
//     // var value_name = req.body.city;
//     // var value_name_2 = req.body.state;
//     // var value_name = req.body.zipcode;
//     // var value_name_2 = req.body.telephone;
//
//     //res.send("shipping succesfully received: " + value_name+ " "+value_name_2);
//
// });






//CODE to route /getAllRoutes to appropriate  Controller function
//**************************************************************************
//***** mongodb get all of the Routes in Routes collection w
//      and Render information iwith an ejs view
router.get('/getAllOrders', controllerMongoCollection.getAllOrders);
router.post('/storeData', controllerMongoCollection.saveOrders);
// mongodb get all of the  in Routes collection and renders information into storeData ejs file
router.get('/storeData', controllerMongoCollection.saveOrders);
module.exports = router;
