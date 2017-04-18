var ZoneController = require('./ZoneController');
var CommentController = require('./CommentController');

module.exports = {
    /* Keys are named after their resource */
    comments: CommentController,
    zone: ZoneController
}
