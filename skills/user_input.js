/* Gets user's input of area and informs the user if there are any properties in this area and output in the
command prompt of all the properties of the houses in this area */

const request = require('request');

module.exports = function(controller) {


   var mysql      = require('mysql');            // Database
   var connection = mysql.createConnection({
     host     : '127.0.0.1',
     user     : 'root',
     password : '',
     database : 'kleindb'
   })
   connection.connect();



   controller.hears('buyujmkm8ik8ik', 'message_received', function(bot, message) {


          // Start convertation about Area
          bot.startConversation(message, function(err, convo) {


              convo.addQuestion('Please give me the area of your interest ', function(response, convo) {

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