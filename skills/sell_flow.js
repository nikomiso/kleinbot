/*Sell flow where the user input is the area and the output is the average price of the this area*/
module.exports = function(controller) {

   //Connection to the database
   var mysql      = require('mysql');
   var connection = mysql.createConnection({
       host     : '127.0.0.1',
       user     : 'root',
       password : '',
       database : 'kleindb'
   })
   connection.connect();

   controller.hears('sell', 'message_received', function(bot, message) {

       // Start convertation about Area
       bot.startConversation(message, function(err, convo) {

           convo.addQuestion('Please give me the area of your interest ', function(response, convo) {

           convo.setVar('area', response.text)

           connection.query("SELECT AVG(Price) AS priceResult FROM properties WHERE Area= ('" + response.text + "')" , function (error, results, fields) {

               if (error) throw error;

               //Loop for displaying each result to the console
               //for (var i = 0; i<results.length; i++){
                   console.log('The average price of '+response.text+' is', results[0].priceResult, 'euros'); // results[i]."here you place the attribute of interest" which you must match with the SELECT of the sql query"
               //}
               convo.setVar('averagePrice', results[0].priceResult)


           });

           console.log('convo.vars:', convo.vars)  // For debugging
           convo.gotoThread('step2');          // Goes to thread step2 and prints the input

           },  {key: 'response'}, 'default')

           convo.addMessage('This average price of properties in {{vars.area}} is {{vars.averagePrice}} euros', 'step2')
       })
   });
}