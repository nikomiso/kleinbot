module.exports = function(controller) {

    controller.hears('now', 'message_received', function(bot, message) {
      bot.startConversation(message, function(err, convo) {
  
        convo.say({
          text: 'Do you want something else?',
          quick_replies: [
            {
              title: 'Yes, back to buy/sell menu.', 
              payload: 'Menu',
            },
            {
                title: 'No, thank you!',
                payload: 'No, thank you!',
            }
          ]
        });
  
  
      });
    });
    }