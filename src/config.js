const VARIABLE = 'REACT_APP_API_ROOT';

const fail = reason => {
  throw new Error(`${VARIABLE} ${reason}`);
};

const validate = raw => {
  if (typeof raw !== 'string' || raw.trim() === '') {
    fail('is not set. Set it to the absolute http(s) URL of the API, for example https://example.test/api.');
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
    fail('must not contain embedded credentials (user:pass@). The value is baked into the public bundle and must not carry a secret.');
  }

  if (parsed.search || parsed.hash || value.indexOf('?') !== -1 || value.indexOf('#') !== -1) {
    fail('must not contain a query string or fragment. The value is baked into the public bundle and must not carry a token.');
  }

  return value.replace(/\/$/, '');
};

let resolvedDefault = null;

export function resolveApiRoot(env) {
  if (env === undefined) {
    if (resolvedDefault === null) {
      resolvedDefault = validate(import.meta.env.REACT_APP_API_ROOT);
    }
    return resolvedDefault;
  }

  return validate(env.REACT_APP_API_ROOT);
}
