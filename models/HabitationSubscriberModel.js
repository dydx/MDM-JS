var mongoose = require('mongoose');
var ContractModel = require('./ContractModel');

var urlDatabase = process.env.MONGO_URL;

var connection = mongoose.connection;
if(!connection.readyState){
	connection = mongoose.connect(urlDatabase, { useMongoClient: true });
}

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var HabitationSubscriberModel = new Schema({
    id    											: ObjectId,
    habitation_subscriber_id  	: Number,
    name     										: String,
    surname      								: String,
    telephone      							: String,
		address 										: String,
		zip_code 										: String,
		email 											: String,
		gender											: String,
		contracts										: [ContractModel.schema],
		__v													: {type: Number, default:0},
		__disabled									: {type: Boolean, default: false}
}, {strict: true});

/*below we define a custom behaviour.
We want that each time a physical document is retrived from MongoDB we delete the properties from the instance returned to the client
*/
var filter = function (doc, ret, options) {
  Object.keys(ret).forEach(function (element, index) {
    if(doc.schema.paths[element] == undefined){
      delete ret[element];
    }
  });
}
if (!HabitationSubscriberModel.options.toObject){
	HabitationSubscriberModel.options.toObject = {};
}
if (!HabitationSubscriberModel.options.toJSON){
	HabitationSubscriberModel.options.toJSON = {};
}
HabitationSubscriberModel.options.toObject.transform = filter;
HabitationSubscriberModel.options.toJSON.transform = filter;

module.exports = mongoose.model('HabitationSubscriberModel', HabitationSubscriberModel, 'customermodels');
