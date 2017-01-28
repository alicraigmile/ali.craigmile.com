'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    appInfo = require('../package'),
    config = require('../config'),
    projects = require('./projects'),
		moment = require('moment'),
    _ = require('lodash');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/status',function (req, res) {
    res.json({ app: appInfo.name, version: appInfo.version });
});

app.get('/projects',function (req, res) {
  var groups = projects.groupByYear();
  
  res.render('projects', {groups: groups});
});

app.get('/teapot',function (req, res) {
  res.status(418).render('teapot', {});
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, '..', 'bower_components')));

module.exports = app;
