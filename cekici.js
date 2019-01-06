const mongoose = require('mongoose');
const axios    = require('axios');
const cheerio  = require('cheerio');

// Set up Mongoose
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/doviz');
mongoose.Promise = global.Promise;

const dovizUSD = require('./models/dovizUSD');


var $;
// Make a request for a user with a given ID
axios.get('https://tr.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&pairs=18')
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
	
	const alis = $('.pid-18-bid').text();
	const satis = $('.pid-18-ask').text();
	const fark = $('.pid-18-pcp').text();
	const artis = $('.pid-18-pc').text();

	const veri = {
		alis,satis,fark,artis
	};

	console.log(veri);

	var usdkayit = new dovizUSD(veri);
    usdkayit.save(function (err) {
        if (err) return console.log(err);
        
    })
});