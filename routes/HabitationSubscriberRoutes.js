var express = require('express');
var router = express.Router();
var habitationSubscriberServices = require("./../services/habitationSubscriberServices");

router.get('/', function (req, res) {

	var limit = (req.query.limit == undefined) ? 50 : req.query.limit;
	var offset = (req.query.offset == undefined) ? 0 : req.query.offset;

	habitationSubscriberServices.getAll(offset, limit, function(err, values){
		res.json(values);
	});
});

router.get('/:id', function (req, res) {
	habitationSubscriberServices.get(req.params.id, function(err, value){
		if(value == null){
			res.status(404).json(value);
		}else{
			res.json(value);
		}
	});
});

router.get('/:id/contracts', function(req, res){
	habitationSubscriberServices.getAllContracts(req.params.id, function(err, data){
		if(err){
			res.status(501).json(err);
		}else if(data == null){
			res.status(404).json(data);
		}else{
			res.json(data);
		}
	})
});

router.post('/', function(req, res){
	habitationSubscriberServices.create(req.body, function(err, data){
		res.json(data);
	});
});

router.put('/:id', function(req, res){
	habitationSubscriberServices.update(req.params.id, req.body, function(err, data){
		if(err){
			res.status(501).json(err);
		}else if(data == null){
			res.status(404).json(data);
		}else{
			res.json(data);
		}
	});
});

router.delete('/:id', function(req, res){
	habitationSubscriberServices.delete(req.params.id, function(err, data){
		if(data.result.n == 0){
			res.status(404).json(data);
		}else{
			res.json(data);
		}
	})
});

router.get('/history/:id', function(req, res){
	habitationSubscriberServices.getHistory(req.params.id, function(err, data){
		if(err){
			res.status(501).json(err);
		}else if(data == null || data.length == 0){
			res.status(404).json(data);
		}else{
			res.json(data);
		}
	});
});

router.post('/history/:id/rollback', function(req, res){
	habitationSubscriberServices.rollback(req.params.id, req.body.version, function(err, data){
		if(err){
			res.status(501).json(err);
		}else if(data == null || data.length == 0){
			res.status(404).json(data);
		}else{
			res.json(data);
		}
	});
});

module.exports = router;
