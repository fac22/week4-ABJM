const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const home = require('./routes/home.js');
const recipesAll = require('./routes/recipesAll.js');
const recipeDelete = require('./routes/recipeDelete.js');
const recipeEdit = require('./routes/recipeEdit.js');
const recipesMine = require('./routes/recipesMine.js');
const recipePost = require('./routes/recipePost.js');
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

/*server.get('/recipesAll', recipesAll.get);
server.post('/recipesAll', recipesAll.post);

server.get('/recipeDelete', recipeDelete.get);
server.post('/recipeDelete, recipeDelete.post);

server.get('/recipeEdit', recipeEdit.get);
server.post('/recipeEdit', recipeEdit.post);

server.get('/recipesMine', recipesMine.get);
server.post('/recipesMine', recipesMine.post);

server.get('/recipePost', recipePost.get);
server.post('/recipePost', recipePost.post);

*/

server.get('/logIn', logIn.get);
server.post('/logIn', logIn.post);

// server.get('/logOut', logOut.get);
server.post('/logOut', logOut.post);

server.get('/signUp', signUp.get);
server.post('/signUp', signUp.post);

/*server.get('/userDelete', userDelete.get);
server.post('/userDelete', userDelete.post);

server.get('/userEdit', userEdit.get);
server.post('/userEdit', userEdit.post);*/

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
