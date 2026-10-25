import { resolveApiRoot } from './config';

const withRoot = value => ({ REACT_APP_API_ROOT: value });

describe('resolveApiRoot', () => {
  it('accepts an absolute http URL', () => {
    expect(resolveApiRoot(withRoot('http://localhost:3000/api'))).toBe('http://localhost:3000/api');
  });

  it('accepts an absolute https URL and strips a single trailing slash', () => {
    expect(resolveApiRoot(withRoot('https://example.test/api/'))).toBe('https://example.test/api');
  });

  it('strips a trailing slash from a bare origin', () => {
    expect(resolveApiRoot(withRoot('https://example.test/'))).toBe('https://example.test');
  });

  it('rejects a missing value and names the variable', () => {
    expect(() => resolveApiRoot({})).toThrow(/REACT_APP_API_ROOT/);
  });

  it('rejects an empty value and names the variable', () => {
    expect(() => resolveApiRoot(withRoot(''))).toThrow(/REACT_APP_API_ROOT/);
  });

  it('rejects a relative path and names the variable', () => {
    expect(() => resolveApiRoot(withRoot('/api'))).toThrow(/REACT_APP_API_ROOT/);
  });

  it('rejects a non-http protocol and names the variable', () => {
    expect(() => resolveApiRoot(withRoot('ftp://example.test/api'))).toThrow(/REACT_APP_API_ROOT/);
  });

  it('rejects embedded credentials and names the variable', () => {
    expect(() => resolveApiRoot(withRoot('https://user:pass@example.test/api'))).toThrow(/REACT_APP_API_ROOT/);
  });

  it('rejects empty userinfo and names the variable', () => {
    expect(() => resolveApiRoot(withRoot('https://@example.test/api'))).toThrow(/REACT_APP_API_ROOT/);
  });

  it('rejects a query string and names the variable', () => {
    expect(() => resolveApiRoot(withRoot('https://example.test/api?token=abc'))).toThrow(/REACT_APP_API_ROOT/);
  });

  it('rejects a fragment and names the variable', () => {
    expect(() => resolveApiRoot(withRoot('https://example.test/api#token'))).toThrow(/REACT_APP_API_ROOT/);
  });
});
