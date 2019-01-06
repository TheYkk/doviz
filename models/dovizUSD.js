const mongoose = require('mongoose');

const dovizUSD = new mongoose.Schema({
    alis:  { type : mongoose.Mixed , default : ''},
    satis: { type : mongoose.Mixed , default : ''},
    fark:  { type : String , default : ''},
    artis: { type : String , default : ''},
    tarih: { type : Date  ,  default : Date.now }

});
//tt.replace(/,/g, '.')

module.exports = mongoose.model('usd',dovizUSD,'usd');


