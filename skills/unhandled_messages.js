module.exports = function(controller) {

    controller.on('message_received', function(bot, message) {

        bot.reply(message, {
            text: 'Fellow Pirate, propably we don\'t speak the same language. Let\'s have some rum to the Menu!',
            quick_replies: [
                {
                  title: 'Menu',
                  payload: 'Menu',
                },
              ]
        });

    });

}