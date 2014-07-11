app.post('/api/user/createEvent', function(req, res) { 
	Event.DeleteDoc(req.body.id, function(err, success) {
		User.createEvent(req.body.id, function(err, success){
			if(err) throw err;
			else res.send(success);//make a fucntion called createEvent
		}

	});
});
 