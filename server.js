'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const home = require('./routes/home.js');

const server = express();

const signUp = require('./routes/signUp.js');
const logIn = require('./routes/logIn.js');
const logOut = require('./routes/logOut.js');
const recipeWrite = require('./routes/recipeWrite.js');
const recipesMine = require('./routes/recipesMine.js');
// const recipesAll = require('./routes/recipesAll.js');
// const recipeDelete = require('./routes/recipeDelete.js');
// const recipeEdit = require('./routes/recipeEdit.js');
// const userDelete = require('./routes/userDelete.js');
// const userEdit = require('./routes/userEdit.js');

server.use(express.urlencoded({ extended: false }));
server.use(express.static('./public'));
server.use(cookieParser(process.env.COOKIE_SECRET));

server.get('/', home.get);

server.get('/signUp', signUp.get);
server.post('/signUp', signUp.post);

server.get('/logIn', logIn.get);
server.post('/logIn', logIn.post);

server.post('/logOut', logOut.post);

server.get('/recipeWrite', recipeWrite.get);
server.post('/recipeWrite', recipeWrite.post);

// // upload.single('avatar'),

// server.get('/recipesAll', recipesAll.get);
// server.post('/recipesAll', recipesAll.post);

server.get('/recipesMine', recipesMine.get);
// server.post('/recipesMine', recipesMine.post);

// server.get('/recipeDelete', recipeDelete.get);
// server.post('/recipeDelete, recipeDelete.post);

// server.get('/recipeEdit', recipeEdit.get);
// server.post('/recipeEdit', recipeEdit.post);

// /*server.get('/userDelete', userDelete.get);
// server.post('/userDelete', userDelete.post);

// server.get('/userEdit', userEdit.get);
// server.post('/userEdit', userEdit.post);*/

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
