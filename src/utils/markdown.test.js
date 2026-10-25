import { describe, it, expect } from 'vitest';
import { escapeHtml, renderMarkdown, safeUrl } from './markdown';

describe('safeUrl', () => {
  it('keeps http, https and mailto URLs', () => {
    expect(safeUrl('https://example.test/article')).toBe('https://example.test/article');
    expect(safeUrl('http://example.test/article')).toBe('http://example.test/article');
    expect(safeUrl('mailto:reader@example.test')).toBe('mailto:reader@example.test');
  });

  it('keeps relative links', () => {
    expect(safeUrl('/article/how-to-read')).toBe('/article/how-to-read');
    expect(safeUrl('./notes')).toBe('./notes');
  });

  it('rejects scripting URLs', () => {
    expect(safeUrl('javascript:alert(1)')).toBeNull();
    expect(safeUrl('JavaScript:alert(1)')).toBeNull();
    expect(safeUrl('java\nscript:alert(1)')).toBeNull();
    expect(safeUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
  });

  it('rejects empty values', () => {
    expect(safeUrl('')).toBeNull();
    expect(safeUrl(undefined)).toBeNull();
  });
});

describe('escapeHtml', () => {
  it('escapes markup and quotes', () => {
    expect(escapeHtml('<img src="x" onerror=\'alert(1)\'>'))
      .toBe('&lt;img src=&quot;x&quot; onerror=&#39;alert(1)&#39;&gt;');
  });
});

describe('renderMarkdown', () => {
  it('renders ordinary markdown', () => {
    const heading = renderMarkdown('## Title');
    expect(heading).toContain('<h2');
    expect(heading).toContain('Title</h2>');
    expect(renderMarkdown('some **bold** text')).toContain('<strong>bold</strong>');
  });

  it('escapes raw HTML from the article body', () => {
    const output = renderMarkdown('<img src=x onerror=alert(1)>');
    expect(output).not.toContain('<img');
    expect(output).toContain('&lt;img');
    expect(renderMarkdown('<script>alert(1)</script>')).not.toContain('<script>');
  });

  it('drops links and images with scripting URLs', () => {
    expect(renderMarkdown('[click](javascript:alert(1))')).not.toContain('javascript:');
    expect(renderMarkdown('![alt](javascript:alert(1))')).not.toContain('javascript:');
  });
});
