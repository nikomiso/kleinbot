/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function(controller) {

  controller.on('hello', conductOnboarding);
  controller.on('welcome_back', conductOnboarding);

  function conductOnboarding(bot, message) {

    bot.startConversation(message, function(err, convo) {

      convo.say({
        text: 'Hello! I am Kleinbot and I am here to assist you if you are looking to buy or sell a property.',
        quick_replies: [
          {
            title: 'buy', 
            payload: 'buy',
          },
          {
              title: 'sell',
              payload: 'sell',
          }
        ]
      });


    });

  }
    
  }
  
