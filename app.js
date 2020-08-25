//handle gaming data
const uniqid = require('uniqid');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');

let limit = 0;

const passport = require('passport');
const cors = require('cors');
const bodyParser = require("body-parser");


require('./auth/strategies/passport')(passport);
app.use(express.json());
app.use(express.static(__dirname + '/public'));
//allow cross origin for development
app.use(cors());
app.use(require('cookie-parser')())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: keys.COOKIE_KEY,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('flash')());



app.use(authRoutes);

//if something went wrong, try reconnecting
const run = async () => {
    await mongoose.connect(keys.MONGO_CONNECT_URI, {
      autoReconnect: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000
    })  
  }
  
  //keep attempting to connect to the server
run().catch(error => console.error(error));

let gameCollection = function(){
  this.totalGameCount = 0;
  this.gameList = [];
}

function buildGame(socket) {
  let gameObject = {};
  gameObject.id = uniqid();
  gameObject.playOne = socket.username;
  gameObject.playerTwo = null;
  gameCollection.totalGameCount++;
  gameCollection.gameList.push({gameObject});

  console.log(`Game Created by ${socket.username} with ${gameObject.id}`);
  io.emit('gameCreated', {
    username: socket.username,
    gameId: gameObject.id
  });
}

function killGame(socket){
  let notInGame = true;
  for(let i = 0; i < gameCollection.totalGameCount; i++) {
    const gameId = gameCollection.gameList[i]['gameObject']['id'];
    const playerOne = gameCollection.gameList[i]['gameObject']['playerOne'];
    const playerTwo = gameCollection.gameList[i]['gameObject']['playerTwo'];
    if(playerOne == socket.username) {
      --gameCollection.totalGameCount;
      gameCollection.gameList.splice(i,1);
      socket.emit('leftGame', { gameId: gameId });
      io.emit('gameDestroyed', { gameId: gameId, gameOwner: socket.username });
      notInGame = false;
    }else if(playerTwo == socket.username) {
      gameCollection.gameList[i]['gameObject']['playerTwo'] = null;
      console.log(socket.username + " has left " + gameId);
      socket.to().emit()
    }
  }
}

function gameSeeker(socket){
  ++loop;
  if((gameCollection.totalGameCount ==0) || (limit >= 20)){
    buildGame(socket);
    limit = 0;
  }else {
    let random = Math.floor(Math.random() * gameCollection.totalGameCount);
    if(gameCollection.gameList[random]['gameObject']['playerTwo'] == null) {
      gameCollection.gameList[random]['gameObject']['playerTwo'] == socket.username;
      socket.emit('joinSuccess', {
        gameId: gameCollection.gameList[random]['gameObject']['id']
      })
      console.log(socket.username + " has been added to: " + gameCollection.gameList[random]['gameObject']['id']);
    }else {
      gameSeeker(socket);
    }
  }
}

let numUsers = 0;

io.on('connection', function(socket) {
  let addedUser = false;

  socket.on('add user', function(username){
    if(addedUser) return;
    socket.username = username;
    ++numUsers;
    addedUser(true);
    socket.emit('login', {
      numUsers: numUsers
    })
  })

  
  socket.on('disconnect', function(){
    if(addedUser){
      --numUsers;
      killGame(socket);
    }
    socket.broadcast.emit('user left', {
      username: socket.username,
      numUsers: numUsers
    })
  });

  /*join game has multiple state s

  There are no current games running 
    user wants to join  
      user builds a game and becomes playerOne

  All the games are full
    wait for someone to leave the game 
      eventually join
      become player 2 
      if no players leave their current game -> create a game
        become player one

  */
  socket.on('joinGame', function(){
    console.log(socket.username + " wants to join the game");
    let alreadyInGame = false;
    for(let i = 0; i < gameCollection.totalGameCount; i++){
      let plyr1Tmp = gameCollection.gameList[i]['gameObject']['playerOne'];
      let plyr2Tmp = gameCollection.gameList[i]['gameObject']['playerTwo'];
      if(plyr1Tmp == socket.username || plyr2Tmp == socket.username) {
        alreadyInGame = true;
        console.log(socket.username + " already has a Game!");
        socket.emit('alreadyJoined', {
          gameId: gameCollection.gameList[i]['gameObject']['id']
        });

      }
    }

    if(alreadyInGame == false){
      gameSeeker(socket);
    }

  });

  socket.on('leaveGame', function(){
    if(gameCollection.totalGameCount == 0){
      socket.emit('notInGame');
    }else {
      killGame(socket);
    }
  });

});

server.listen(PORT);



