const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT) || 4100;
const buildDir = path.resolve(__dirname, '..', 'build');
const indexFile = path.join(buildDir, 'index.html');

const VARIABLE = 'REACT_APP_API_ROOT';

const fail = reason => {
  throw new Error(`${VARIABLE} ${reason}`);
};

const validateApiRoot = raw => {
  if (typeof raw !== 'string' || raw.trim() === '') {
    fail('is not set. Set it to the absolute http(s) URL of the API, for example http://localhost:3000/api.');
  }

  const value = raw.trim();

  let parsed;
  try {
    parsed = new URL(value);
  } catch (error) {
    fail('must be an absolute http or https URL.');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    fail(`must use the http or https protocol, but uses "${parsed.protocol}".`);
  }

  const authorityStart = value.indexOf('//');
  const authority = authorityStart === -1
    ? ''
    : value.slice(authorityStart + 2).split(/[/?#]/)[0];

  if (parsed.username || parsed.password || authority.indexOf('@') !== -1) {
    fail('must not contain embedded credentials (user:pass@). The value is public and must not carry a secret.');
  }

  if (parsed.search || parsed.hash || value.indexOf('?') !== -1 || value.indexOf('#') !== -1) {
    fail('must not contain a query string or fragment. The value is public and must not carry a token.');
  }

  return value.replace(/\/$/, '');
};

let resolvedApiRoot;

const getApiRoot = () => {
  if (resolvedApiRoot === undefined) {
    resolvedApiRoot = validateApiRoot(process.env.REACT_APP_API_ROOT);
  }
  return resolvedApiRoot;
};

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

const escapeJsonForScript = value =>
  JSON.stringify(String(value))
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

const injectRuntimeConfig = html => {
  const apiRoot = getApiRoot();
  const script = `<script>window.__APP_CONFIG__ = {"apiRoot": ${escapeJsonForScript(apiRoot)}};</script>`;
  const headEnd = html.search(/<\/head\s*>/i);

  if (headEnd === -1) {
    return `${script}${html}`;
  }

  return `${html.slice(0, headEnd)}${script}${html.slice(headEnd)}`;
};

const sendFile = (req, res, filePath, statusCode) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal Server Error');
      return;
    }

    const isIndex = path.resolve(filePath) === indexFile;
    const body = isIndex
      ? Buffer.from(injectRuntimeConfig(data.toString('utf8')), 'utf8')
      : data;

    res.writeHead(statusCode, {
      'Content-Type': contentTypeFor(filePath),
      'Cache-Control': statusCode === 200 && path.extname(filePath) === '.html'
        ? 'no-cache'
        : 'public, max-age=31536000'
    });
    res.end(req.method === 'HEAD' ? undefined : body);
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

const start = () => {
  try {
    getApiRoot();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  if (!fs.existsSync(indexFile)) {
    console.error(`No production build found at ${buildDir}. Run "npm run build" first.`);
    process.exit(1);
  }

  server.listen(port, () => {
    console.log(`Serving ${buildDir} on http://localhost:${port}`);
  });
};

if (require.main === module) {
  start();
}

module.exports = { injectRuntimeConfig, server, start, validateApiRoot };
