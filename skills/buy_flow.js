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
  
      controller.hears(['buy'], 'message_received', function(bot, message){
      bot.startConversation(message, function(err, convo) {


        convo.addQuestion('Give me area: ', function(response, convo) {

         convo.setVar('area', response.text)

                 connection.query("SELECT * FROM properties WHERE Area= ('" + response.text + "')" , function (error, results, fields) {
                 if (error) throw error;
                 console.log('The solution is: ', results);
                 });

             console.log('convo.vars:', convo.vars)  // For debugging
             convo.gotoThread('step2');          // Goes to thread step2 and prints the input



         },  {key: 'response'}, 'default')

         convo.addMessage('This is your area: {{vars.area}}', 'step2')



    })

});


}