const mongoose = require('mongoose');
const axios    = require('axios');
const cheerio  = require('cheerio');

// Set up Mongoose
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/doviz2');
mongoose.Promise = global.Promise;

const USD = require('./models/USD');


function getFromSite() { 
    var $;
    // Make a request for a user with a given ID
    axios.get('https://www.bloomberght.com/doviz/dolar')
    .then(function (response) {
        // handle success
        

        console.log('Get response');
        
        $ = cheerio.load(response.data);
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        console.log('log response');
        
        const table = $('.marketsData  tr').eq(2);
        //console.log($('td',table).eq(4).text());

        const alis   =   $('td',table).eq(1).text().replace(/,/g, '.');
        const satis  =   $('td',table).eq(2).text().replace(/,/g, '.');
        const fark   =   $('td',table).eq(3).text().replace(/,/g, '.');
        //make time
        const sondate = new Date();

        var tt = $('td',table).eq(4).text().split(':');
        sondate.setHours(...tt);
        
        const tarih  = createDateAsUTC(sondate)

        const veri = {
            alis,satis,fark,tarih
        };

        console.log(veri);

        var usdkayit = new USD(veri);
        usdkayit.save(function (err) {
            if (err) return console.log(err);
            
        })
    });

}
getFromSite();
setInterval(getFromSite,10*1000)
function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}