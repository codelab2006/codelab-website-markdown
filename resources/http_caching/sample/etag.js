const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const eTag = '12345';

const server = http.createServer((req, res) => {
  const ifNoneMatch = req.headers['if-none-match'];
  if (!!ifNoneMatch && ifNoneMatch === eTag) {
    res.writeHead(304);
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Etag', eTag);
    res.end('<a href="/">Hello World Etag</a>');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
