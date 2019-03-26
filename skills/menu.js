/* User goes back to the menu with the buy/sell options */

module.exports = function(controller) {

    controller.hears('Menu', 'message_received', function(bot, message) {
        bot.startConversation(message, function(err, convo) {
            convo.say({
                text: 'Well, okay! How can I assist you?',
                quick_replies: [
                  {
                    title: 'Buy', 
                    payload: 'Buy',
                  },
                  {
                      title: 'Sell',
                      payload: 'Sell',
                  }
                ]
              });

        });
    });
}