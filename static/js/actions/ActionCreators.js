'use strict';

var Reflux = require('reflux');

var ActionCreators = Reflux.createActions([
    'onAddActiveRoom',
    'onAddRoom',
    'onOpenRoom'
]);

module.exports = ActionCreators;