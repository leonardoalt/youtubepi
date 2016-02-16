'use strict';
var app = angular.module('app.torrentCtrl', ['app.factory']);

app.controller('torrentCtrl', ['$scope', 'socket', function($scope, socket)
{
    var self = this;
    self.server_status = {status: 'Disconnected', class: 'error'};
    self.ylink = '';

    socket.on('info', function(data)
    {
        self.server_status = data;
    });

    socket.on('disconnect', function()
    {
        self.server_status = {status: 'Disconnected', class: 'error'};
    });

    socket.on('cache', function(cache)
    {
        self.server_status = {status: 'Connected', class: 'success'};
    });

    this.play = function(ylink)
    {
        socket.emit('play', ylink);
    };

}]);

