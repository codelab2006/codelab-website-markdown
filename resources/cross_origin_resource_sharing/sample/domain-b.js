const http = require('http');

const hostname = '127.0.0.1';
const port = 3002;

const json = {
  data: '恭喜你获得了来自 domain B 的数据'
};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  // 如果没有 Access-Control-Allow-Origin 头，浏览器将拦截返回的 response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(json));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
