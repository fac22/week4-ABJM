const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const home = require('./routes/home.js');
const jamAll = require('./routes/jamAll.js');
const jamDelete = require('./routes/jamDelete.js');
const jamEdit = require('./routes/jamEdit.js');
const jamMy = require('./routes/jamMy.js');
const logIn = require('./routes/logIn.js');
const logOut = require('./routes/logOut.js');
const signUp = require('./routes/signUp.js');
const userDelete = require('./routes/userDelete.js');
const userEdit = require('./routes/userEdit.js');

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.static('./public'));
server.use(cookieParser(process.env.COOKIE_SECRET));

server.get('/', home.get);

server.get('/jamAll', jamAll.get);
server.post('/jamAll', jamAll.post);

server.get('/jamDelete', jamDelete.get);
server.post('/jamDelete', jamDelete.post);

server.get('/jamEdit', jamEdit.get);
server.post('/jamEdit', jamEdit.post);

server.get('/jamMy', jamMy.get);
server.post('/jamMy', jamMy.post);

server.get('/logIn', logIn.get);
server.post('/logIn', logIn.post);

server.get('/logOut', logOut.get);
server.post('/logOut', logOut.post);

server.get('/signUp', signUp.get);
server.post('/signUp', signUp.post);

server.get('/userDelete', userDelete.get);
server.post('/userDelete', userDelete.post);

server.get('/userEdit', userEdit.get);
server.post('/userEdit', userEdit.post);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
