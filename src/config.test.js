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

describe('resolveApiRoot at start time', () => {
  afterEach(() => {
    delete globalThis.__APP_CONFIG__;
  });

  it('prefers the runtime value over the baked one', () => {
    globalThis.__APP_CONFIG__ = { apiRoot: 'https://runtime.example.test/api' };

    expect(resolveApiRoot()).toBe('https://runtime.example.test/api');
  });

  it('prefers the runtime value over an explicitly passed baked value', () => {
    globalThis.__APP_CONFIG__ = { apiRoot: 'https://runtime.example.test/api' };

    expect(resolveApiRoot(withRoot('https://baked.example.test/api')))
      .toBe('https://runtime.example.test/api');
  });

  it('rejects an invalid runtime value and names the variable', () => {
    globalThis.__APP_CONFIG__ = { apiRoot: '/api' };

    expect(() => resolveApiRoot()).toThrow(/REACT_APP_API_ROOT/);
  });

  it('rejects an empty runtime value instead of falling back and names the variable', () => {
    globalThis.__APP_CONFIG__ = { apiRoot: '' };

    expect(() => resolveApiRoot()).toThrow(/REACT_APP_API_ROOT/);
  });

  it('rejects an invalid runtime value instead of using the baked one', () => {
    globalThis.__APP_CONFIG__ = { apiRoot: '/api' };

    expect(() => resolveApiRoot(withRoot('https://baked.example.test/api'))).toThrow(/REACT_APP_API_ROOT/);
  });

  it('rejects an empty runtime value instead of using the baked one', () => {
    globalThis.__APP_CONFIG__ = { apiRoot: '' };

    expect(() => resolveApiRoot(withRoot('https://baked.example.test/api'))).toThrow(/REACT_APP_API_ROOT/);
  });
});
