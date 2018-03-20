let express=require('express');
let stripe=require('stripe')('stripe_api_key');
let hbs= require('hbs');
let bodyParser= require('body-parser');

let app =express();
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/paysuccess', function (req, res) {
    res.render('paysuccess');
});

app.post('/charge', function (req, res) {

    let token = req.body.stripeToken; // Using Express
    
    let charge=stripe.charges.create({
        amount: 2999,
        currency: "usd",
        description: "Example charge",
        source: token
    }, function(err, charge) {
        // asynchronously called
        if(err){
            console.log(err);
        }else{
            console.log(charge);
        }
    });
    res.redirect('/paysuccess')
});

app.listen(3000, function () {
   console.log('Magic happens at port 3000');
});
