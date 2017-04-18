var Zone = require('../models/Zone.js');

module.exports = {

  find: function(params, callback){
    Zone.find(params, function(err, zones){
      /*
      Convention is the error is first,
      payload is second.
      */
      if (err){
        callback(err, null);
        return
      }

      callback(null, zones);
    });
  },

  findById: function(id, callback){
    Zone.findById(id, function(err, zone){
      if (err){
        callback(err, null);
        return
      }

      callback(null, zone);
    });
  },

  create: function(params, callback){
    var zips = params['zipCodes'];
    var zip = zips.split(',');
    /*
      Even though at this point zip is the array we wanted,
      we need to trim the elements of any whitespace to
      ensure the array matches the schema purely.
    */
    var newZips = [];
    zip.forEach(function(zipCode){
      newZips.push(zipCode.trim());
      /* Future edge cases would be added here */
    });

    params['zipCodes'] = newZips;

    Zone.create(params, function(err, zone){
      if(err){
        callback(err, null);
      }

      callback(null, zone);
    });
  },

  update: function(id, params, callback){
    Zone.findByIdAndUpdate(id, params, {new:true}, function(err, zone){
      if (err){
        callback(err, null);
        return
      }

      callback(null, zone);
    });
  },

  delete: function(id, callback){
    Zone.findByIdAndRemove(id, function(err){
      if (err){
        callback(err, null);
        return
      }

      callback(null, null);
    });
  }
}
