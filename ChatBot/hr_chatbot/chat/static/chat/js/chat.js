// chat/static/chat/js/chat.js

function sendMessage() {
    var userMessage = $('#user-input').val();
    if (userMessage.trim() === '') return;

    appendMessage('user', userMessage);
    $('#user-input').val('');

    $.ajax({
        url: chatUrl,
        type: 'POST',
        data: {
            'message': userMessage,
            'csrfmiddlewaretoken': csrfToken
        },
        success: function(response) {
            appendMessage('bot', response.response);
        }
    });
}

function appendMessage(sender, message) {
    var messageClass = sender === 'user' ? 'user-message' : 'bot-message';
    var messageHtml = '<div class="message ' + messageClass + '"><span>' + message + '</span></div>';
    $('#chat-messages').append(messageHtml);
    $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
}

$('#user-input').keypress(function(e) {
    if (e.which == 13) {
        sendMessage();
    }
});

// Add a greeting message when the page loads
$(document).ready(function() {
    appendMessage('\bot\', \'Hello! I\'m your HR Service Chatbot. How can I assist you today?');
});