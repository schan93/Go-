'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
	startDate: String,
	startTime: String,
 	endDate: String,
 	endTime: String, 
 	eventLocation: String,
 	eventName: String
});

module.exports = mongoose.model('Event', EventSchema);