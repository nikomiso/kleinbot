const request = require('request');

module.exports = function(controller) {
    request('http://localhost/botkit/test_json/sample_db.json', function (error, response, body) {
    var answerAdress;
    var infoAddressArr = '';

        controller.hears('JSON Clean', 'message_received', function(bot, message) {
            const info = JSON.parse(body);
            // request('https://api.myjson.com/bins/ot27a', function (error, response, body) {
            // request('http://localhost/botkit/test_json/sample_db.json', function (error, response, body) {
            bot.startConversation(message, function(err, convo) {
                

                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                // console.log('body:', body); // Print the HTML for the Google homepage.

                // const info = JSON.parse(body);
                convo.setVar('jsonInfo', info[0].Price)
                // var infoAddressArr = '';
                var infoPriceArr;


                for(var i = 0; i < info.length; i++){

                    infoAddressArr += info[i].Adress;
                    convo.setVar('jsonAddress', infoAddressArr)

                    // infoPriceArr += info[i].Price;
                    // convo.setVar('jsonPrice', infoPriceArr)

                    if (info[i].Adress == "Sofouli 24") {
                        answerAdress += info[i].Adress; // Maybe I don't need it
                        convo.setVar('jsonAddress', answerAdress)
                        console.log("THIS IS: " + info[i].Adress);
                        convo.addMessage('Address Exist: {{vars.answerAdress}} ..', 'default')
                    }
                }

                convo.addMessage('Address: {{vars.jsonAddress}} ..', 'default')

                convo.addMessage('First Price {{vars.jsonInfo}} ..', 'default')
                
            })

                

            // });  // end request(..)
        
            bot.reply(message,'Hears JSON Clean.');      




            // Start convertation about Address
            bot.startConversation(message, function(err, convo) {

                convo.addMessage('Give me Address', 'default')

                // Add a question, to the deafult thread, with a response handler that will set a variable
                // and then switch us to another thread
                convo.addQuestion('', function(response, convo) {
                    convo.setVar('userAddress', response.text)
                    // now the convo.vars field has been updated
                    console.log('convo.vars:', convo.vars)
                    convo.gotoThread('step2')
                },  {key: 'response'}, 'default')
                
                // Since this variable is defined after our response handler runs,
                // it is available throughout our conversation after that point
                convo.addMessage('User Address: {{vars.userAddress}}', 'step2')

                // for(var i = 0; i < info.length; i++){
                //     if (info[i].Adress == "Sofouli 24") {
                //         answerAdress += info[i].Adress; // Maybe I don't need it
                //         convo.setVar('jsonAddress', answerAdress)
                //         console.log("THIS IS: " + info[i].Adress);
                //         convo.addMessage('THIS IS: {{vars.userAddress}} ..', 'default')
                //     }
                // }    
            })

        });
    
    });
}