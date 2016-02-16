'use strict';
var http = require('http');
var fs = require('fs');
var TAG = 'SOCKET.IO';
var promise = require('bluebird');
var numeral = require('numeral');
var omxplayer = require('./omxplayer');

var IO = function(app, config){
    var io = require('socket.io')(app);
    var timeout;
    try
    {
        io.on('connection', function(socket){

            socket.emit('info', {status: 'Connected', class: 'success'});

            socket.on('play', function(ylink){
                omxplayer.play(ylink);
                //socket.emit('info', {status: 'Gathering metadata', class:'information'});
            });

            socket.on('pause_player', function(){
                omxplayer.pause();
            });
            socket.on('stop_player', function(){
                omxplayer.stop();
            });
            socket.on('forward_player', function(){
                omxplayer.forward();
            });
            socket.on('backward_player', function(){
                omxplayer.backward();
            });
            socket.on('volume_up', function(){
                omxplayer.volume_up();
            });
            socket.on('volume_down', function(){
                omxplayer.volume_down();
            });

        });
    }
    catch(err)
    {
        console.error(TAG, 'Failed to init:', err);
    }
};

module.exports = IO;
