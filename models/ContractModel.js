var mongoose = require('mongoose');

var urlDatabase = process.env.MONGO_URL;

var connection = mongoose.connection;
if(!connection.readyState){
	connection = mongoose.connect(urlDatabase,  { useMongoClient: true });
}

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ContractModel = new Schema({
    id    													: ObjectId,
    auto_contract_id  							: Number,
    habitation_contract_id  				: Number,
		death_insurrance_contract				: Number,
		health_protection_contract			: Number,
    address     										: String,
    zip_code      									: String,
		details													: String,
		car_brand												: String,
		amount													: Number,
		__v															: {type: Number, default:0}
},  {strict: true});

/*below we define a custom behaviour.
We want that each time a physical document is retrived from MongoDB we delete the properties from the instance returned to the client
*/
var filter = function (doc, ret, options) {
  Object.keys(ret).forEach(function (element, index) {
    if(doc.schema.paths[element] == undefined){
      delete ret[element];
    }
  });
};
if (!ContractModel.options.toObject){
	ContractModel.options.toObject = {};
}
if (!ContractModel.options.toJSON){
	ContractModel.options.toJSON = {};
}
ContractModel.options.toObject.transform = filter;
ContractModel.options.toJSON.transform = filter;

module.exports = mongoose.model('ContractModel', ContractModel);
