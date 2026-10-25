const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT) || 4100;
const buildDir = path.resolve(__dirname, '..', 'build');
const indexFile = path.join(buildDir, 'index.html');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const contentTypeFor = filePath =>
  contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';

const sendFile = (req, res, filePath, statusCode) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal Server Error');
      return;
    }

    res.writeHead(statusCode, {
      'Content-Type': contentTypeFor(filePath),
      'Cache-Control': statusCode === 200 && path.extname(filePath) === '.html'
        ? 'no-cache'
        : 'public, max-age=31536000'
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request');
    return;
  }

  const requested = path.resolve(buildDir, `.${pathname}`);
  if (requested !== buildDir && requested.indexOf(`${buildDir}${path.sep}`) !== 0) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.stat(requested, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(req, res, requested, 200);
      return;
    }

    if (path.extname(pathname)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    sendFile(req, res, indexFile, 200);
  });
});

if (!fs.existsSync(indexFile)) {
  console.error(`No production build found at ${buildDir}. Run "npm run build" first.`);
  process.exit(1);
}

server.listen(port, () => {
  console.log(`Serving ${buildDir} on http://localhost:${port}`);
});
