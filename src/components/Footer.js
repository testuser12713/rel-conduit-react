import React from 'react';
import { NavLink } from 'react-router-dom';

const footerStyles = `
.site-footer {
  --footer-surface: #F7F7F7;
  --footer-fg: #2B2B2B;
  --footer-muted: #8C8C8C;
  --footer-border: #E5E5E5;
  --footer-accent: #5CB85C;
  --footer-accent-ring: #B8E0B8;
  --footer-space-2: 12px;
  --footer-space-3: 16px;
  --footer-space-4: 24px;
  background: var(--footer-surface);
  border-top: 1px solid var(--footer-border);
  padding: var(--footer-space-4);
  color: var(--footer-muted);
  font-family: "Inter", system-ui, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
}

.site-footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--footer-space-3);
  max-width: 1160px;
  margin: 0 auto;
}

.site-footer-brand {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--footer-space-2);
}

.site-footer-wordmark {
  color: var(--footer-accent);
  font-family: "Literata", Georgia, "Times New Roman", serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.25;
  text-decoration: none;
}

.site-footer-attribution {
  color: var(--footer-muted);
  text-decoration: none;
}

.site-footer-attribution:hover,
.site-footer-link:hover {
  color: var(--footer-fg);
}

.site-footer-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.site-footer-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 var(--footer-space-2);
  color: var(--footer-muted);
  text-decoration: none;
}

.site-footer-link:focus-visible,
.site-footer-wordmark:focus-visible,
.site-footer-attribution:focus-visible {
  outline: 2px solid var(--footer-accent-ring);
  outline-offset: 2px;
}

.site-footer-link-active {
  color: var(--footer-fg);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.site-footer-link-disabled {
  opacity: .55;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .site-footer-inner {
    align-items: flex-start;
  }
}
`;

const Footer = () => (
  <footer className="site-footer">
    <style>{footerStyles}</style>
    <div className="site-footer-inner">
      <div className="site-footer-brand">
        <NavLink to="/" className="site-footer-wordmark">
          conduit
        </NavLink>
        <a
          className="site-footer-attribution"
          href="https://realworld.io"
          target="_blank"
          rel="noopener noreferrer">
          Built on the RealWorld spec
        </a>
      </div>
      <nav className="site-footer-nav" aria-label="Footer">
        <NavLink exact to="/" className="site-footer-link" activeClassName="site-footer-link-active">
          Home
        </NavLink>
        <NavLink to="/privacy" className="site-footer-link" activeClassName="site-footer-link-active">
          Privacy
        </NavLink>
        <span
          className="site-footer-link site-footer-link-disabled"
          aria-disabled="true"
          title="Terms are not available yet">
          Terms
        </span>
      </nav>
    </div>
  </footer>
);

export default Footer;
