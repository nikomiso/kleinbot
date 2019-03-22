/* Here users must follow a link in order to entry their data*/
module.exports = function(controller) {

    controller.hears('entry', 'message_received', function(bot, message) {
        bot.startConversation(message, function(err, convo) {
        
            convo.addMessage('To entry your property for sale, \n follow the link below.')
            convo.addMessage('<http://localhost/form>');
    

        });
    });
}
