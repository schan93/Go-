'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
	startDate: Date,
 	endDate: Date,
 	eventLocation: String,
 	eventName: String,
 	atendees: Array
});

module.exports = mongoose.model('Event', EventSchema);