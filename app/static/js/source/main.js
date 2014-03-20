/* global io: false */

(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    initializeSocketIO();
    $('button').click(sendMessage);
  }

  var socket;

  function initializeSocketIO(){
    socket = io.connect('/app');
    socket.on('online', function(data){console.log(data);});
    socket.on('message', addMessage);
  }

  function addMessage(data){
    var words = $('<div>');
    words.text(data.text);
    $('#messages').append(words);
  }

  function sendMessage(e){
    var data = {};
    data.text = $('textarea').val();
    socket.emit('newmessage', data);
    e.preventDefault();
  }

})();
