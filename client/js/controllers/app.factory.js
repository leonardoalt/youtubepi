var app = angular.module('app.factory', []);

app.factory('socket', ['$rootScope', function($rootScope){
    var socket = io('http://localhost:8080');
    return {
        on: function(eventName, callback){
            socket.on(eventName, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data){
            socket.emit(eventName, data);
        }
    }
}]);

