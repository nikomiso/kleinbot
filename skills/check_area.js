/* Checks if the response text of the user is in our database 
    and returns a list with the areas in our database */ 

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
        
        controller.hears('choose', 'message_received', function(bot, message) {
            var areasArray=[];
            // Start convertation about buy
            bot.startConversation(message, function(err, convo) {
    
                
                convo.ask('Give the location you\'re interested in Thessaloniki', function(response, convo) {
                convo.setVar('area', response.text)
                var area = response.text;
                    
                        
                        connection.query("SELECT DISTINCT AREA FROM properties" , function (error, results, fields) {
                            if (error) throw error;
                            
                            //Loop for displaying each result to the console
                            for (var i = 0; i<results.length; i++){
                                var counter=i+1;
                                console.log('Area '+ counter + ':' , results[i].AREA)
                                areasArray[i] = 'Area' + counter + ': ' + results[i].AREA + '\n\n\n\n'
                                //console.log(areasArray[i])
                                convo.setVar('listOfAreas', areasArray.join(''));
    
                            }
    
                            for(var i=0; i<results.length; i++){
                                if(area.toUpperCase()==results[i].AREA.toUpperCase()){
                                    console.log('YES')
                                    convo.gotoThread('step2')
                                }
                                else{
                                    console.log('NO')
                                    //convo.gotoThread(step3)
                                    convo.next()
                                }
                            }
    
                        });
                        
                    console.log('convo.vars:', convo.vars)  // For debugging
                    
                    convo.next()
            
                },  {key: 'response'}, 'default')
                   convo.addMessage('You area is on our list '+ "\n", 'step2')
                   convo.addMessage('{{vars.listOfAreas}} '+ '\n','step2')
    
                
            })
            
    
            
        });
    }