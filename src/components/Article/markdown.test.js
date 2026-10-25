import { describe, it, expect } from 'vitest';
import { marked } from 'marked';

describe('article markdown sanitising', () => {
  it('escapes raw HTML when rendered with the article body options', () => {
    const html = marked.parse('<img src=x onerror="alert(1)">', { sanitize: true });

    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img');
  });
});
