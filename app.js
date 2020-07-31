//handle gaming data
const uniqid = require('uniqid');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;
const google = require('./auth/strategies/google');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
let limit = 0;
const cors = require('cors');

//allow cross origin for development
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/user/register', (req,res) => {
  res.sendFile(path.join(__dirname + '/public/registration.html'));
})
app.get('/dashboard', (req,res) => {
  res.send('This is your dashboard');
})


//stuff the user session in the cookie
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, 
  keys: [keys.COOKIE_KEY]
}))
app.use(passport.initialize());
app.use(passport.session());

//if something went wrong, try reconnecting
const run = async () => {
    await mongoose.connect(keys.MONGO_CONNECT_URI, {
      autoReconnect: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000
    })
    
  }
  
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


app.use(authRoutes);

//handling 404s/ failure to find favicon.ivo:1


// app.use((req,res,next) => {
//   next({
//     status: 404,
//     message: 'Not found'
//   });
// })
// app.use((err,req,res,next) => {
//   if(err.status === 404) {
//     console.log(true);
//     res.send('Your request cannot be handled.');
//   }
//   next();
// })
server.listen(PORT);
