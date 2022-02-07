const tmi = require('tmi.js'),
    { channel, username, password } = require('./settings.json');

const options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity : {
        username,
        password
    },
    channels: [channel]
};

const client = new tmi.Client(options);
client.connect().catch(console.error);

client.on('connected', () => {
    client.say(channel, `${username} has connected!`);
});

client.on('message', (channel, user, message, self) => {
    if(self) return;

    if(message.charAt(0) == '!') {
        
        
        var msg = message;
		const search = ' ';
        const replaceWith = '_';
        if(typeof(msg) != "undefined"){
            msg = msg.split(search).join(replaceWith);
        
        const request = require("request");
        request({
            url:"https://api.monkedev.com/fun/chat?msg="+msg,
            json:true
        },(err,response,body)=>{
            console.log(JSON.stringify(body,undefined,4));
            const res = JSON.stringify(body,undefined,4);
            let j;
            var res2="";
           
            for(j=19;j<res.length-3;j++){
                
                res2+=res.charAt(j);
            }
            
            client.say(channel, `🤖@${user.username}🤖, ${res2}`);
        
        });

        console.log("message is:",msg);
        console.log("message type is:",typeof(msg))
        }else{
            client.say(channel, `🤖@${user.username}🤖, if you type in English and without Emoji, I will be able to read you text`);
        }
        
    }

    if(message == '!roll') {
        client.say(channel, `@${user.username} Rolled a ${Math.floor(Math.random() * 6) + 1}!`);
    }
    if(message == '!dice') {
        client.say(channel, `@${user.username} Rolled a ${Math.floor(Math.random() * 6) + 1}!`);
    }
});
