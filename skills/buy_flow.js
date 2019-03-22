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
            convo.ask('Give the location you\'re interested in Thessaloniki', function(response, convo) {
            convo.setVar('area', response.text)
            var area = response.text;

            convo.next();
                convo.ask('Give me a price:', function(response, convo){
                    convo.setVar('price',response.text)
                    var price = response.text;
                    
                    connection.query("SELECT Address,Price,Size FROM properties WHERE Area = ('"+ area +" ') AND Price <= ( "+ price +" ) " , function (error, results, fields) {
                        if (error) throw error;

                        console.log('We have some properties in ' + area + ' you might be interested in: '+ "\n")
                        
                        //Loop for displaying each result to the console
                        for (var i = 0; i<results.length; i++){
                            var counter=i+1;
                            console.log('Property '+ counter + ':' , results[i].Address, '   ', results[i].Price,'$','   ', results[i].Size,' squaremeters')
                            propertiesArray[i] = ' Property ' + counter + ': ' + results[i].Address + '   ' + results[i].Price +'$'+'   '+ results[i].Size + ' m^2' +  '\n\n\n\n'
                            console.log(propertiesArray[i])
                            convo.setVar('listOfProperties', propertiesArray.join(''));
     
     
                        }
                    });
                    
                console.log('convo.vars:', convo.vars)  // For debugging
                convo.addMessage('{{vars.listOfProperties}} '+ '\n','step2')
                convo.gotoThread('step2');          // Goes to thread step2 and prints the input
                convo.next()
            })
            },  {key: 'response'}, 'default')
               convo.addMessage('We have some properties in {{vars.area}} you might be interested in: '+ "\n", 'step2')
        })
    });
}
 