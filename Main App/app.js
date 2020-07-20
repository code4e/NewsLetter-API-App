const port = 4000;
const express = require('express');
const path = require('path');
const app = express();
const https = require('https');
const {
    METHODS
} = require('http');
const { response } = require('express');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
const apiKey = `6ba34baee1be46041074009d99f0ab82-us10`;
const list_id = `0c9ef6fa74`;


app.get('/', function (req, res) {
    return res.render('home', {
        title: 'My NewSletter App'
    });
});
app.get('/failure', (req, res) => {
    return res.redirect('/');
});
app.post('/register-user', (req, res) => {
    let data = {
        members: [{
            email_address: req.body.email,
            status: 'subscribed',
            merge_fields: {
                FNAME: req.body.firstName,
                LNAME: req.body.lastName
            }
        }]
    };
      
    let jsonData = JSON.stringify(data);
    app.get('/', (req, res) => {
        return res.render('home', {
            title: 'My NewsLetter App'
        })
    });
    let url = `https://us10.api.mailchimp.com/3.0/lists/${list_id}`;
    let options = {
        method: "POST",
        auth: `umar1:${apiKey}`
    };
    let recievedData;
    var success = false;
    let request = https.request(url, options, function (response) {
        if(response.statusCode == 200){
            res.sendFile(__dirname + '/views/success.html');
        }
        else{
            res.sendFile(__dirname + '/views/failure.html');
        }
        response.on("data", (data) => {
            recievedData = JSON.parse(data);
        });
    });
    request.write(jsonData);
    request.end();
    console.log(success);
    
});







app.listen(port, function (err) {
    if (err) {
        console.log('Cannot start server');
    } else {
        console.log('Server has started');
    }
});