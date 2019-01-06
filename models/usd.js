const mongoose = require('mongoose');

const dovizUSD = new mongoose.Schema({
    alis:  { type : Number , default : ''},
    satis: { type : Number , default : ''},
    fark:  { type : Number , default : ''},
    tarih: { type : Date  ,  default : '' }

});
//tt.replace(/,/g, '.')

module.exports = mongoose.model('usd',dovizUSD,'usd');


