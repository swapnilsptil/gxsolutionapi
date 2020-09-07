/**
 * Author : Swapnil Patil
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogDetails = new Schema({
    title : {type : String},
    description : {type : String},
    createdDate : { type: Date, default: Date.now },
    readingTime : {type : String}
})

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile : {type: Number, required: true},
    email : {type: String, required : true},
    hash: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    blogs : [{type : blogDetails}]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
