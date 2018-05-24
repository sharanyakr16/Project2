var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://sharanya16:sAsh5+enkA@ds225840.mlab.com:25840/heroku_mgjkmjm6';


/** getAllRoutes controller logic that current does model logic too -connects to Mongo database and
 * queries the Routes collection to retrieve all the routes and build the output usig the
 * ejs template mongodb.ejs found in views directory
 * @param request
 * @param response
 *
 */
module.exports.getAllOrders =  function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err,  client) {
        if(err) throw err;


        //get handle to the databse
        var theDatabase = client.db('heroku_mgjkmjm6');


        //get collection of routes
        var Orders = theDatabase.collection('ORDERS');


        //FIRST showing you one way of making request for ALL routes and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log
        var c = Orders.find({}); //

        c.forEach(
            function(myDoc) {
                console.log( "name: " + myDoc.name );  //just  loging the output to the console
            }
        );


        //SECOND -show another way to make request for ALL Routes  and simply collect the  documents as an
        //   array called docs that you  forward to the  getAllRoutes.ejs view for use there
        Orders.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('getAllOrders', {results: docs});

        });


        //Showing in comments here some alternative read (find) requests
        //this gets Routes where frequency>=10 and sorts by name
        // Routes.find({ "frequency": { "$gte": 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
        // this sorts all the Routes by name
        //  Routes.find().sort({ name: 1 }).toArray(fu namenction (err, docs) {


        //close connection when your app is terminating.
        client.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function
module.exports.saveOrders = function(req,res){
    mongodb.MongoClient.connect(mongoDBURI, function(err,  client) {
        if(err) throw err;


        //get handle to the databse
        var db = client.db('heroku_mgjkmjm6');

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
                if (err) throw "Customer error";
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
                if (err) throw "Billing error";
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
                if (err) throw "Shipping error";
            }
        )

        var ordersdata = {
            CUSTOMER_ID:customerID,
            BILLING_ID:billingID,
            SHIPPING_ID:shippingID,
            DATE: Date.now(),


        };
        ORDERS.insertOne(ordersdata, function (err, result) {
                if (err) throw "No Success";
                res.render('successSave');
            }
        )


        //get collection of routes
        // var billings = theDatabase.collection('BILLINGS');
        //
        // var value_name1 = req.body.firstname;
        // var value_name2 = req.body.lastname;
        // var value_name3 = req.body.address;
        // var value_name4 = req.body.address2;
        // var value_name5 = req.body.city;
        // var value_name6 = req.body.state;
        // var value_name7 = req.body.zipcode;
        // var value_name8 = req.body.telephone;
        // //FIRST showing you one way of making request for ALL routes and cycle through with a forEach loop on returned Cursor
        // //   this request and loop  is to display content in the  console log
        //
        // billings.insert({firstname:value_name1,lastname:value_name2,address:value_name3,address2:value_name4,city:value_name5,state:value_name6,zipcode:value_name7,telephone:value_name8});
        // res.render('successSave');


        //SECOND -show another way to make request for ALL Routes  and simply collect the  documents as an
        //   array called docs that you  forward to the  getAllRoutes.ejs view for use there
        // Orders.find().toArray(function (err, docs) {
        //     if(err) throw err;
        //
        //     response.render('getAllOrders', {results: docs});
        //
        // });


        //Showing in comments here some alternative read (find) requests
        //this gets Routes where frequency>=10 and sorts by name
        // Routes.find({ "frequency": { "$gte": 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
        // this sorts all the Routes by name
        //  Routes.find().sort({ name: 1 }).toArray(fu namenction (err, docs) {


        //close connection when your app is terminating.
        client.close(function (err) {
            if(err) throw err;
        });
    });
};