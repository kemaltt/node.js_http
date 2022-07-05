const http = require("http");
const fs = require("fs");

function sendFiles(path, response) {
  fs.readFile(path, (err, data) => {
    if (err) {
      response.end("Error at server side...");
      return;
    }
    response.end(data.toString());
  });
}

const server = http.createServer((request, response) => {
  console.log("neue request:", request.method, request.url);
  if (request.url === "/") {
    sendFiles("assets/html/index.html", response);
  } else {
    const filePath = "assets" + request.url;
    sendFiles(filePath, response);
  }
});

const PORT = 9000;
server.listen(PORT, () => console.log("Server is running on port " + PORT));
