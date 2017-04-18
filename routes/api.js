var express = require('express');
var router = express.Router();
var ZoneController = require('../controllers/ZoneController.js');
var controllers = require('../controllers');
// The index is the default as no file was specified

router.get('/:resource', function(req, res, next) {
  /*
    The Http method defines which controller will be called for.
    This makes the route modular, by allowing different resources.
  */
  var resource = req.params.resource;
  var controller = controllers[resource];

  // Err handling if the controller is an invalid resource
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Inavlid resource request: '+resource
    });

    return
  }

  controller.find(req.query, function(err, results){
    if (err) {
      res.json({
        confirmation: 'fail',
        message: err
      });
      return
    }

    res.json({
        confirmation: 'success',
        results: results
    });
  });
});

router.get('/:resource/:id', function(req, res, next){

  var resource = req.params.resource;
  var id = req.params.id;

  var controller = controllers[resource];
  // Err handling if the controller is an invalid resource
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Inavlid resource request: '+resource
    });

    return
  }

  controller.findById(id, function(err, result){
    if(err){
      res.json({
        confirmation: 'fail',
        message:  'Not Found'
      });
      return
    }

    res.json({
      confirmation: 'success',
      result: result
    });
  });
});

router.post('/:resource', function(req, res, next){

  var resource = req.params.resource;
  var controller = controllers[resource];
  // Err handling if the controller is an invalid resource
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Inavlid resource request: '+resource
    });

    return
  }

  controller.create(req.body, function(err, result){
    if(err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return
    }
    res.json({
      confirmation: 'success',
      result: result
    });
  });
});

module.exports = router;
