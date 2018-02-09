const http = require('http');
const fs = require('fs');
const path = require('path');

const indexFilePath = path.join(__dirname, 'index.html');

const buildCookieHeaders = (name, val) => {
  const headers = {};
  headers['Set-Cookie'] = `${name}=${val}; Max-Age=10`;
  return headers;
};

http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === '/') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream(indexFilePath).pipe(res);
  } else if (req.url.indexOf('ok') !== -1) {
      res.writeHead(200, buildCookieHeaders('okCookie', 'ok'));
      res.end();
  } else if (req.url.indexOf('forbidden') !== -1) {
    res.writeHead(200, buildCookieHeaders('failCookie', 'fail'));
    res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
}).listen(5000);
