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

    controller.hears(['buy', 'sell'], 'message_received', function(bot, message) {

      bot.startConversation(message, function(err, convo) {
        
        // set up a menu thread which other threads can point at.
        convo.ask({
          text: 'Give the area you are interested in:',
          quick_replies: [
            {
              title: 'Thermi',
              payload: 'thermi',
            },
            {
              title: 'Kalamaria',
              payload: 'kalamaria',
            },
            {
              title: 'Evosmos',
              payload: 'evosmos',
            },
          ]
        },[
          {
            pattern: 'thermi',
            callback: function(res, convo) {
              convo.gotoThread('thermi');
              convo.next();
            }
          },
          {
            pattern: 'kalamaria',
            callback: function(res, convo) {
              convo.gotoThread('kalamaria');
              convo.next();
            }
          },
          {
            pattern: 'evosmos',
            callback: function(res, convo) {
              convo.gotoThread('evosmos');
              convo.next();
            }
          },
          {
            default: true,
            callback: function(res, convo) {
              convo.gotoThread('end');
            }
          }
        ]);

        // set up docs threads
        convo.addMessage({
          text: 'Sorry. I do not know how to help with that. Try again.'
        },'end');
                
        // set up docs threads
        convo.addMessage({
          text: 'There are 3 properties in Thermi',
        },'thermi');

        convo.addMessage({
          action: 'default'
        }, 'thermi');


        // set up community thread
        convo.addMessage({
          text: 'There are 2 properties in Kalamaria',
        },'kalamaria');

        convo.addMessage({
          action: 'default'
        }, 'kalamaria');



        // set up contact thread
        convo.addMessage({
          text: 'There are 5 properties in Evosmos',
        },'evosmos');
        convo.addMessage({
          action: 'default'
        }, 'evosmos');

      });
     
      
 
    });
    
  }
