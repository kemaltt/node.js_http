const http = require("http");
const fs = require("fs");

const sendFiles = (path, response) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      response.end("Error at server side...");
      return;
    }

    if (path.endsWith(".svg")) {
      response.setHeader("Content-Type", "image/svg+xml");
    }
    response.end(data);
  });
};

const server = http.createServer((request, response) => {
  console.log("neue request:", request.method, request.url);
  if (request.url === "/") {
    sendFiles("assets/pages/index.html", response);
  } else {
    const filePath = "assets" + request.url;
    sendFiles(filePath, response);
  }
});

const PORT = 9000;

server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
