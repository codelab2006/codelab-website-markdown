const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;
const domainBPort = 3002;
const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    您当前访问的页面来自 domain A (http://${hostname}:${port}/)，
    此页面中的脚本将请求 domain B (http://${hostname}:${domainBPort}) 的数据，请查看控制台获取请求结果。
    <script>
      fetch('http://${hostname}:${domainBPort}')
        .then(response => response.json())
        .then(json => console.log(json.data));
    </script>
  </body>
</html>
`;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
