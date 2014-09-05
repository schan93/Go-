'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
	startDate: Date,
 	endDate: Date,
 	eventLocation: String,
 	eventName: String,
 	attendees: [{type: String, ref: 'User'}],
 	invited: [{username: String}],
 	creator: String,
  eventLocationLat: Number,
  eventLocationLng: Number
});



module.exports = mongoose.model('Event', EventSchema);