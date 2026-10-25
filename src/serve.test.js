import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { validateApiRoot } = require('../scripts/serve');

describe('validateApiRoot', () => {
  it('accepts an absolute http URL', () => {
    expect(validateApiRoot('http://localhost:3000/api')).toBe('http://localhost:3000/api');
  });

  it('accepts an absolute https URL and strips a single trailing slash', () => {
    expect(validateApiRoot('https://example.test/api/')).toBe('https://example.test/api');
  });

  it('strips a trailing slash from a bare origin', () => {
    expect(validateApiRoot('https://example.test/')).toBe('https://example.test');
  });

  it.each([
    ['a missing value', undefined],
    ['an empty value', ''],
    ['a blank value', '   '],
    ['a relative path', '/api'],
    ['a non-http protocol', 'ftp://example.test/api'],
    ['embedded credentials', 'https://user:pass@example.test/api'],
    ['empty userinfo', 'https://@example.test/api'],
    ['a query string', 'https://example.test/api?token=abc'],
    ['a fragment', 'https://example.test/api#token']
  ])('rejects %s and names the variable', (_label, value) => {
    expect(() => validateApiRoot(value)).toThrow(/REACT_APP_API_ROOT/);
  });
});
