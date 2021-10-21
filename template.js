const logOut = require('./routes/logOut');
// Can attach this to a log-out button that we can see on every page

function buildPage(title, content) {
	return /*html*/ `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="yuhuuu">
      <link rel="stylesheet" href="/style.css">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Overpass:wght@300&family=Titillium+Web&display=swap" rel="stylesheet">
      <title>${title}</title>
   </head>
   <body>
   <header><h1>B-JAM<h1></header>
   <main><section><div class="main">${content}<div></section></main>
   <script src="/index.js"></script>

   </body>`;
}

module.exports = { buildPage };
