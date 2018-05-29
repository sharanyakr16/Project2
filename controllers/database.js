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
        var routes = theDatabase.collection('ROUTES');

       routes.insert({ORDER_ID:orderID,CUSTOMER_ID:customerID,BILLING_ID:billingID,SHIPPING_ID:shippingID,DATE:Date.now()});
        //FIRST showing you one way of making request for ALL routes and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log
        var c = routes.find({}); //

        c.forEach(
            function(myDoc) {
                console.log( "name: " + myDoc.name );  //just  loging the output to the console
            }
        );


        //SECOND -show another way to make request for ALL Routes  and simply collect the  documents as an
        //   array called docs that you  forward to the  getAllRoutes.ejs view for use there
        routes.find(({ORDER_ID:orderID}).toArray(function (err, docs) {
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
module.exports.getSavedOrder =  function (request, response) {


};//end function
module.exports.saveOrders = function(req,res){
    mongodb.MongoClient.connect(mongoDBURI, function(err,  client) {
        if(err) throw "Connection Error";
    //generate random values for customer id, billing id, shippingid, orderid
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        var orderID = Math.floor((Math.random() * 1000000000000) + 1);
        // //get handle to the databse
        var theDatabase = client.db('heroku_mgjkmjm6');


        //get collection of customers
        var customers = theDatabase.collection('CUSTOMERS');
        //insert into customers collection
        customers.insert({_id:customerID,firstname:req.body.Bfirstname,lastname:req.body.Blastname,address:req.body.Baddress,address2:req.body.Baddress2,
            city:req.body.Bcity,state:req.body.Bstate,zipcode:req.body.Bzipcode,email:req.body.cemail,telephone:req.body.Btelephone});
        //get collection of billings
        var billings = theDatabase.collection('BILLINGS');
        //insert into billings collection
        billings.insert({_id:billingID,customerID:customerID,cardnumber:req.body.cardnumber,cvv:req.body.cvv,cardExp:req.body.expDate,cardname:req.body.cardname});
        //get collection of shippings
        var shippings = theDatabase.collection('SHIPPINGS');
        //get collection of orders
        var orders = theDatabase.collection('ORDERS');

        //FIRST showing you one way of making request for ALL routes and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log



        //

        // //FIRST showing you one way of making request for ALL routes and cycle through with a forEach loop on returned Cursor
        // //   this request and loop  is to display content in the  console log
        //
        //insert values into shipping collection
        shippings.insert({shippingID:shippingID,firstname:req.body.Sfirstname,lastname:req.body.Slastname,shippingAddress:req.body.Saddress,address2:req.body.Saddress2,
            Shipping_CITY:req.body.Scity,SHIPPING_STATE:req.body.Sstate,SHIPPING_ZIP:req.body.Szipcode,telephone:req.body.Stelephone});

        //insert values into orders collection
        orders.insert({ORDER_ID:orderID,CUSTOMER_ID:customerID,BILLING_ID:billingID,SHIPPING_ID:shippingID,DATE:Date.now()});

        //res.render('successSave', {results: req.body});
        //show a way to make request for ALL orders  and simply collect the  documents as an
        //   array called docs that you  forward to the  storeData.ejs view for use there
        orders.find().toArray(function (err, docs) {
            if(err) throw err;

            res.render('storeData', {results: docs});

        });



        //Showing in comments here some alternative read (find) requests
        //this gets Routes where frequency>=10 and sorts by name
        // Routes.find({ "frequency": { "$gte": 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
        // this sorts all the Routes by name
        //  Routes.find().sort({ name: 1 }).toArray(fu namenction (err, docs) {


        //close connection when your app is terminating.
        client.close(function (err) {
            if(err) throw "Disconnection eror";
        });
    });
};
