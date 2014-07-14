exports.createEvent = function (req, res, next) {
  res.send('Hello World');
  /*var newEvent = new Event(req.body);
  newEvent.provider = 'local';
  newEvent.role = 'user';
  newEvent.save(function(err, event) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });*/
};
 