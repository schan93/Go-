'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', controller.create);
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/events/:id', controller.getEvents);
router.get('/users/:username', controller.getProfile);
router.get('/individualUser/:username', controller.getUserId);
router.get('/invited/events/:id', controller.getInvitedEvents);
router.get('/user/username/email/:username', controller.getEmail);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', controller.update);
router.put('/:id/:username', controller.requestFriend);
router.put('/friends/:id/:username', controller.requestPending);
router.put('/friends/pending/confirm/:username', controller.confirmFriend);
router.put('/set/invited/events/current/:username', controller.setInvitedEvents);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);


module.exports = router;
