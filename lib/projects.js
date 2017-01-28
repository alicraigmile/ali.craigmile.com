'use strict';

var projectsData = require('../projects').projects,
    _ = require('lodash');

function _reverseSortYear(o) {
    if (! o.year) {
        return 0;
    }
    return -1 * o.year;
}

function groupByYear() {

    var groups = _(projectsData)
        .filter(function(o) { return !o.hidden; })
        .orderBy('name', 'asc')
        .map(function(a) {
            if (! a.year) {
                a.year = 'Other';
            }
            return a;
        })
        .groupBy('year')
        .map(function(o,p) {
            return { 'year': p, 'projects': o };
        })
        .orderBy(_reverseSortYear)
        .value();

    return groups;
}

module.exports = {
    all: projectsData,
    groupByYear: groupByYear
};
