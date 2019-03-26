/* Buy flow with results in the command prompt */
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
    
    controller.hears('buy', 'message_received', function(bot, message) {
        var propertiesArray=[];
        // Start convertation about buy
        bot.startConversation(message, function(err, convo) {

            convo.addMessage('Hmm... Let me see!','default')
            convo.ask('So, give me the location you\'re interested in Thessaloniki.', function(response, convo) {
            convo.setVar('area', response.text)
            var area = response.text;

            convo.next();
                convo.ask('Now, please give me the highest price you\'re willing to pay.', function(response, convo){
                    convo.setVar('price',response.text)
                    var price = response.text;
                    
                    connection.query("SELECT Address,Price,Size,AREA FROM properties WHERE AREA = ('"+ area +" ') AND Price <= ( "+ price +" ) " , function (error, results, fields) {
                        if (error) throw error;

                        console.log('We have some properties in ' + results[0].AREA + ' you might be interested in: '+ "\n")
                        
                        //Loop for displaying each result to the console
                        for (var i = 0; i<results.length; i++){
                            var counter=i+1;
                            console.log('Property '+ counter + ':' , results[i].Address, '   ', results[i].Price,'€','   ', results[i].Size,' squaremeters')
                            propertiesArray[i] = '• Result ' + counter + ': ' + results[i].Address + ' ,  ' + results[i].Price +'€'+' ,  '+ results[i].Size + 'm\u00B2' +  '\n\n\n\n'
                            //console.log(propertiesArray[i])
                            convo.setVar('listOfProperties', propertiesArray.join(''));
                            
                        }
                        convo.setVar('actualName',results[0].AREA)   //to show Thermi and not thermi or w/e the user types

                    });
                    
                console.log('convo.vars:', convo.vars)  // For debugging
                convo.addMessage('{{vars.listOfProperties}} '+ '\n','step2')
                convo.gotoThread('step2');          // Goes to thread step2 and prints the output
                convo.next()
                convo.say({                                               // To handle the flow after results 
                    text: 'Do you need anything else?',
                    quick_replies: [
                      {
                        title: 'Yes, back to buy/sell menu.', 
                        payload: 'Menu',
                      },
                      {
                          title: 'No, thank you!',
                          payload:  'No, thank you!',
                      }
                    ]
                });
            })
            },  {key: 'response'}, 'default')
               convo.addMessage('Alright! I have some properties you might want to check out.'+ "\n", 'step2')     

        })
             

    });
}