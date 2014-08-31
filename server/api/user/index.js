'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.get('/events/:id', controller.getEvents);
router.put('/:id/:username', controller.requestFriend);
router.put('/friends/:id/:username', controller.requestPending);
router.put('/friends/pending/confirm/:username', controller.confirmFriend);
router.get('/users/:username', controller.getProfile);

module.exports = router;
