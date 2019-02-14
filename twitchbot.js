const tmi = require('tmi.js');

const options = {
	options: {
		debug: true,
	}, 
	connection: {
		cluster: 'aws',
		reconnect: true,
	},
	identity: {
		username: "jhonnyjrbot",
		password: "oauth password here",
	},
	channels: ['jhonnyjrbot'],	
};

//Configurações padrões do bot acima
//Default bot's settings

const client = new tmi.client(options);

client.connect();

client.on('connected', (address, port) => {
	client.action('jhonnyjrbot', "Connected succesfully!");
});
// Mensagem/Ação quando o bot se conecta
//Message when it gets connected


client.on("chat", (channel, user, message, self) => { 
	//Responde no chat a mensagem que o usuario mandou
  //Replys on chat what a users said

	if (message === "Hi!") 
	{
		client.action("jhonnyjrbot", "Hi!");
	}
	else if (message === "Ping!")
	{
		client.action("jhonnyjrbot", "Pong!");
	}
});
client.on("chat", (channel, user, message, self) => {
    if (message === "Hello, Bot!")
    {
        client.action("jhonnyjrbot", "Hi there " + user["display-name"])
        //Responde a mensagem e fala o nome do usuário que mandou "Hello, Bot!"
        //Replies the message quoting the user's name
    }
});

var interval = setInterval (function () {
  
let messages = [
    'Message 1',
    'Message 2',
    'Message 3',
    'Message 4',
]
    let random = messages[Math.floor(Math.random() * messages.length)];

client.action("jhonnyjrbot", `${random}`)

 }, 60000); 
//Cita 1 das 3 frases acima a cada 60 segundos
//Quotes 1 out of the 3 messages above every 60 seconds

client.on("chat", (channel, user, message, self) => {
 if (message === '!dice')
 {
  const num = rollDice();
  client.action("jhonnyjrbot", user["display-name"] + " got: " + num + " !") 
 }
})
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
//Simple dice game
