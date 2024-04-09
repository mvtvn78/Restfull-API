const mongoose = require("mongoose")
// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Collection')
  .then(() => console.log('Connected!'));
// Schema 
const Schema = mongoose.Schema;
// 
const AccountSchema = new Schema({
    username: String,
    password: String,
},{
  collection: "Account"
});
const AccountModel = mongoose.model('account',AccountSchema)
module.exports = AccountModel