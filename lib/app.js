var express = require('express'),
    app = express(),
    path = require('path'),
    package = require('../package'),
    config = require('../config'),
    projects = require('../projects'),
		moment = require('moment');
		

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/status',function (req, res) {
    res.json({ app: package.name, version: package.version });
});

app.get('/projects',function (req, res) {
  res.render('projects', projects);
});

app.get('/teapot',function (req, res) {
  res.status(418).render('teapot', {});
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, '..', 'bower_components')));

module.exports = app;
