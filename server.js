"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

const home = require("./routes/home.js");

const server = express();
const auth = require("./auth.js");

const signUp = require("./routes/signUp.js");
const logIn = require("./routes/logIn.js");
const logOut = require("./routes/logOut.js");
const recipeWrite = require("./routes/recipeWrite.js");
const recipesMine = require("./routes/recipesMine.js");
// const recipesAll = require('./routes/recipesAll.js');
// const recipeDelete = require('./routes/recipeDelete.js');
// const recipeEdit = require('./routes/recipeEdit.js');
// const userDelete = require('./routes/userDelete.js');
// const userEdit = require('./routes/userEdit.js');

server.use(express.urlencoded({ extended: false }));
server.use(express.static("./public"));
server.use(cookieParser(process.env.COOKIE_SECRET));

server.get("/", home.get);

server.get("/signUp", signUp.get);
// server.post('/signUp', signUp.post);

server.get("/logIn", logIn.get);
server.post("/logIn", logIn.post);

server.post("/logOut", logOut.post);

server.get("/recipeWrite", recipeWrite.get);
server.post("/recipeWrite", recipeWrite.post);

// // upload.single('avatar'),

// server.get('/recipesAll', recipesAll.get);
// server.post('/recipesAll', recipesAll.post);

server.get("/recipesMine", recipesMine.get);
// server.post('/recipesMine', recipesMine.post);

// server.get('/recipeDelete', recipeDelete.get);
// server.post('/recipeDelete, recipeDelete.post);

// server.get('/recipeEdit', recipeEdit.get);
// server.post('/recipeEdit', recipeEdit.post);

// /*server.get('/userDelete', userDelete.get);
// server.post('/userDelete', userDelete.post);

// server.get('/userEdit', userEdit.get);
// server.post('/userEdit', userEdit.post);*/
const multer = require("multer");
const upload = multer();
const MAX_SIZE = 1000 * 1000 * 5; // 5 megabytes
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

server.post("/signUp", upload.single("avatar"), (request, response) => {
  const file = request.file;
  console.log(file.buffer);
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    response
      .status(400)
      .send("<h1>File upload error</h1><p>Please upload an image file</p>");
  }
  if (file.size > MAX_SIZE) {
    response
      .status(400)
      .send("<h1>File upload error</h1><p>Profile picture must be < 5MB</p>");
  } else {
    const { email, password, name } = request.body;
    auth
      .createUser(name, email, password, file.buffer)
      .then(auth.saveUserSession)
      .then((sid) => {
        response.cookie("sid", sid, auth.COOKIE_OPTIONS);
        response.redirect("/");
      })
      .catch((error) => {
        console.error(error);
        response.send(`Error`, `<h2>Couldn't sign up, sorry</h2>`);
      });
  }
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
