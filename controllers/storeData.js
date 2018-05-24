var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://Chandana:Chandu03!@ds133360.mlab.com:33360/heroku_1zwzjmrz';
//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencode

module.exports.storeData = function (req, res, next) {

    mongodb.MongoClient.connect(mongoDBURI, function (err, db) {
        if (err) throw err;
        /**************************
         * IMPORTANT:  this is how you generate  a random number for  3IDs that
         * you will need for the collections cusomerID, billinID and   shippingID
         *    WHY?  the retrieve _id  info after and  insert (see below)  does not seem
         *     to function properly on Heroku
         *    so to know the ID we simply generate it in code  rather than
         *     autogenerate it for the documents we newly insert into the CUSTOMERS, BILLING, SHIPPING
         *      for ORDERS we allow the system to autogenerate its  _id
         */
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        //customer collection operation


        var CUSTOMERS = db.collection('CUSTOMERS');
        var BILLING = db.collection('BILLINGS');
        var SHIPPING = db.collection('SHIPPINGS');
        var ORDERS = db.collection('ORDERS');


        /*CUSTOMERS.deleteMany({}, function (err, result) {
        if (err) throw err;
        });*/

        var customerdata = {
            _id: customerID,
            FIRSTNAME: req.body.Bfirstname,
            LASTNAME: req.body.Blastname,
            STREET:req.body.Baddress+ ' ' + req.body.Baddress2,
            CITY: req.body.Bcity,
            STATE: req.body.Bstate,
            ZIP: req.body.Bzipcode,
            PHONE: req.body.Btelephone
        };
        CUSTOMERS.insertOne(customerdata, function (err, result) {
                if (err) throw err;
            }
        )


        var billingdata = {
            _id: billingID,
            CUSTOMER_ID: customerID,
            CREDITCARDNAME: req.body.cardname,
            CREDITCARDNUM: req.body.cardnumber,
            CREDITCARDEXP: req.boy.expDate,
            CREDITCARDSECURITYNUM: req.body.cvv
        };
        BILLING.insertOne(billingdata, function (err, result) {
                if (err) throw err;
            }
        )

        var shippingdata = {
            _id: shippingID,
            CUSTOMER_ID: customerID,
            SHIPPING_STREET: req.body.address + ' ' +req.body.address2,
            SHIPPING_CITY: req.body.city,
            SHIPPING_STATE: req.body.city,
            SHIPPING_ZIP: req.body.zipcode
        };
        SHIPPING.insertOne(shippingdata, function (err, result) {
                if (err) throw err;
            }
        )

        var ordersdata = {
            CUSTOMER_ID:customerID,
            BILLING_ID:billingID,
            SHIPPING_ID:shippingID,
            DATE: Date.now(),


        };
        SHIPPING.insertOne(shippingdata, function (err, result) {
                if (err) throw err;
            res.render('successSave');
            }
        )




    })
}