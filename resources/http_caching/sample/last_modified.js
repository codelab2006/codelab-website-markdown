const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const ifModifiedSince = req.headers['if-modified-since'];
  if (!!ifModifiedSince) {
    res.writeHead(304);
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Last-Modified', new Date().toUTCString());
    res.end('<a href="/">Hello World Last-Modified</a>');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
