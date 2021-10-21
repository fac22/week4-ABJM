const express = require("express");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

const home = require("./routes/home.js");
const recipesAll = require("./routes/recipesAll.js");
const recipeDelete = require("./routes/recipeDelete.js");
const recipeEdit = require("./routes/recipeEdit.js");
const recipesMine = require("./routes/recipesMine.js");
const recipePost = require("./routes/recipePost.js");
const logIn = require("./routes/logIn.js");
const logOut = require("./routes/logOut.js");
const signUp = require("./routes/signUp.js");
const userDelete = require("./routes/userDelete.js");
const userEdit = require("./routes/userEdit.js");
const multer = require("multer");
const server = express();

const auth = require("./auth.js");
const model = require("./database/model.js");

const { buildPage } = require("./template.js");

const upload = multer();
const MAX_SIZE = 1000 * 1000 * 5; // 5 megabytes
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

server.use(express.urlencoded({ extended: false }));
server.use(express.static("./public"));
server.use(cookieParser(process.env.COOKIE_SECRET));

server.get("/", home.get);

server.post("/", upload.single("avatar"), (request, response) => {
  const file = request.file;

  //file.mimetype tells us what kind of file it was
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    response
      .status(400)
      .send("<h1>File upload error</h1><p>Please upload an image file</p>");
  }
  //file.size tells us how big the file was (in bytes)
  if (file.size > MAX_SIZE) {
    response
      .status(400)
      .send("<h1>File upload error</h1><p>Profile picture must be < 5MB</p>");
  } else {
    const { name, email, password } = request.body;
    console.log(file.buffer);
    auth
      .createUser(name, email, password, file.buffer)
      .then(auth.saveUserSession)
      .then((sid) => {
        response.cookie("sid", sid, auth.COOKIE_OPTIONS);
        response.redirect("/");
      })
      .catch(() => {
        response.send(buildPage(`Error`, `<h2> Couldn't sign up, sorry</h2>`));
      });
  }
});

// e.g. request from an img tag
// <img src="/user/3/avatar">

server.get("/user/:id/avatar", (req, res) => {
  model.getAvatar(req.params.id).then((user) => {
    res.send(user.avatar);
  });
});

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

server.get("/logIn", logIn.get);
server.post("/logIn", logIn.post);

// server.get('/logOut', logOut.get);
server.post("/logOut", logOut.post);

server.get("/signUp", signUp.get);
//server.post('/signUp', signUp.post);

/*server.get('/userDelete', userDelete.get);
server.post('/userDelete', userDelete.post);

server.get('/userEdit', userEdit.get);
server.post('/userEdit', userEdit.post);*/

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
