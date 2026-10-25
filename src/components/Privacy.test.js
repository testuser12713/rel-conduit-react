import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Privacy from './Privacy';

let container;

const renderPrivacy = () => {
  act(() => {
    ReactDOM.render(<Privacy />, container);
  });
};

describe('Privacy', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    container.remove();
    container = null;
  });

  it('renders one row for every processing operation', () => {
    renderPrivacy();

    const rows = container.querySelectorAll('[data-testid="processing-row"]');
    expect(rows.length).toBe(4);

    const text = container.textContent;
    expect(text).toContain('Registration and login');
    expect(text).toContain('Profile data');
    expect(text).toContain('Articles, comments and favorites');
    expect(text).toContain('Hosting including server logs with IP address');
    expect(text).toContain('Legal basis');
    expect(text).toContain('Retention');
    expect(text).toContain('Recipients');
    expect(text).toContain('Third country');
  });

  it('describes the account and content processing with purpose and legal basis', () => {
    renderPrivacy();

    const text = container.textContent;
    expect(text).toContain('E-mail address');
    expect(text).toContain('salted hash');
    expect(text).toContain('Article content');
    expect(text).toContain('IP address');
    expect(text).toContain('Art. 6(1)(b) GDPR');
    expect(text).toContain('Art. 6(1)(f) GDPR');
  });

  it('marks every customer-supplied detail with the placeholder badge', () => {
    renderPrivacy();

    const badges = container.querySelectorAll('[data-testid="placeholder-badge"]');
    expect(badges.length).toBeGreaterThan(0);
    badges.forEach(badge => {
      expect(badge.textContent).toBe('[To be provided by the client]');
    });

    expect(container.textContent).toContain('Controller');
    expect(container.textContent).toContain('Supervisory authority');
  });

  it('lists the data subject rights and the right to complain', () => {
    renderPrivacy();

    const text = container.textContent;
    expect(text).toContain('Right of access');
    expect(text).toContain('Right to rectification');
    expect(text).toContain('Right to erasure');
    expect(text).toContain('Right to restriction of processing');
    expect(text).toContain('Right to data portability');
    expect(text).toContain('Right to object');
    expect(text).toContain('right to lodge a complaint with a supervisory authority');
  });
});
