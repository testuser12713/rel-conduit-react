import { afterEach, describe, expect, it, vi } from 'vitest';

describe('application entry point', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    document.body.innerHTML = '';
  });

  it('renders the privacy route through the real startup path', async () => {
    vi.stubEnv('REACT_APP_API_ROOT', 'https://api.example.test/api');
    window.localStorage.clear();
    window.history.replaceState({}, '', '/privacy');
    document.body.innerHTML = '<div id="root"></div>';

    await import('./index');

    expect(document.body.textContent).not.toContain('Configuration error');
    expect(document.body.textContent).toContain('Privacy Policy');
    expect(document.body.querySelector('footer.site-footer')).not.toBeNull();
  });
});
