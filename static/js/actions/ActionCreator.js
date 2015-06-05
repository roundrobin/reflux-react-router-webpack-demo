'use strict';
var Reflux = require('reflux');
var ActionCreators = Reflux.createActions([
    'addRoom',
    'openRoom',
    'addMessage'
]);
module.exports = ActionCreators;
