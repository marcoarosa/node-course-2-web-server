const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs') //handle bars

app.use((req, res, next) => {  // Middleware to log 
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);

    //Create log file in server and append info
    fs.appendFile('server.log',log + '\n',(err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    })
    next()
})

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));  //middleware


//Helper with no variables
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
})

//Helper with variables
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase()
})

app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Site!'
    })
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'    })
});

app.get('/bad',(req,res) => {
   res.send({
       error: 'bad'
   });
});

app.listen(3000,() => {
    console.log('server is up on port 3000.');
});
