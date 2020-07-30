const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// setup static directory
const option = {
    extensions: ['html','htm']
}
app.use(express.static(path.join(__dirname, '../public'), option));

// setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// setup routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'WeatherApp',
        name: 'Wahyu Setya Permadi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Wahyu Setya Permadi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Can we help you?',
        title: 'Help',
        name: 'Wahyu Setya Permadi'
    });
});

app.get('/help/*', (req, res) => {
    res.render('notfound',{
        title: '404 Page',
        message: 'Help article not found'
    });
});

app.get('/weather', (req, res) => {
   if (!req.query.address) {
       return res.send({
           error: 'Address must be provided'
       });
   } 
   
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }
            
            return res.send({
                forecast,
                location,
                address: req.query.address
            });
        });
   });
});

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         });
//     }

//     console.log(req.query.search);
//     res.send({
//         products: []
//     })
// })

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404 Page',
        message: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});