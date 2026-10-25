import { marked } from 'marked';

const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:'];

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function safeUrl(href) {
  if (typeof href !== 'string') {
    return null;
  }

  const trimmed = href.trim();
  if (!trimmed) {
    return null;
  }

  const cleaned = trimmed.replace(/[\u0000-\u0020]/g, '');
  if (!/^[a-z][a-z0-9+.-]*:/i.test(cleaned)) {
    return trimmed;
  }

  let parsed;
  try {
    parsed = new URL(cleaned);
  } catch (error) {
    return null;
  }

  return ALLOWED_PROTOCOLS.indexOf(parsed.protocol) === -1 ? null : trimmed;
}

const renderer = new marked.Renderer();

renderer.html = html => escapeHtml(html);

renderer.link = (href, title, text) => {
  const url = safeUrl(href);
  if (url === null) {
    return text;
  }

  const titleAttribute = title ? ` title="${escapeHtml(title)}"` : '';
  return `<a href="${escapeHtml(url)}"${titleAttribute} rel="nofollow noopener noreferrer">${text}</a>`;
};

renderer.image = (href, title, text) => {
  const url = safeUrl(href);
  if (url === null) {
    return escapeHtml(text);
  }

  const titleAttribute = title ? ` title="${escapeHtml(title)}"` : '';
  return `<img src="${escapeHtml(url)}" alt="${escapeHtml(text)}"${titleAttribute}>`;
};

export function renderMarkdown(body) {
  const source = body === undefined || body === null ? '' : String(body);
  return marked.parse(source, { renderer });
}
