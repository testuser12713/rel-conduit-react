import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import App from './App';
import Header from './Header';
import Privacy from './Privacy';
import reducer from '../reducer';

describe('Privacy page', () => {
  let container;

  const renderPrivacy = () => {
    ReactDOM.render(<Privacy />, container);
  };

  const renderHeader = currentUser => {
    ReactDOM.render(
      <MemoryRouter>
        <Header appName="conduit" currentUser={currentUser} />
      </MemoryRouter>,
      container
    );
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;
  });

  it('renders one row for every processing operation that actually takes place', () => {
    renderPrivacy();

    const rows = container.querySelectorAll('.privacy-table tbody tr');
    expect(rows.length).toBe(4);

    const text = container.textContent;
    expect(text).toContain('Registration and login');
    expect(text).toContain('hashed password');
    expect(text).toContain('Profile data');
    expect(text).toContain('Articles, comments and favorites');
    expect(text).toContain('Hosting including server logs');
    expect(text).toContain('IP address');
    expect(text).toContain('Legal basis');
    expect(text).toContain('Retention');
    expect(text).toContain('Recipients');
    expect(text).toContain('Third country');
  });

  it('visibly marks every detail the client still has to provide', () => {
    renderPrivacy();

    const badges = container.querySelectorAll('.privacy-placeholder');
    expect(badges.length).toBeGreaterThan(0);

    badges.forEach(badge => {
      expect(badge.textContent).toBe('[To be provided by the client]');
    });

    const controller = container.querySelector('#controller');
    expect(controller).not.toBeNull();
    expect(controller.querySelectorAll('.privacy-placeholder').length).toBeGreaterThan(0);

    expect(container.querySelector('#complaint').textContent).toContain(
      '[To be provided by the client]'
    );
    expect(container.textContent).toContain('Last updated:');
  });

  it('lists the data-subject rights and the complaint right', () => {
    renderPrivacy();

    const text = container.textContent;
    expect(text).toContain('Access');
    expect(text).toContain('Rectification');
    expect(text).toContain('Erasure');
    expect(text).toContain('Restriction');
    expect(text).toContain('Portability');
    expect(text).toContain('Objection');
    expect(text).toContain('Right to complain to a supervisory authority');
  });

  it('offers the privacy link in the header to signed-out and signed-in visitors', () => {
    renderHeader(null);
    expect(container.querySelector('a[href="/privacy"]')).not.toBeNull();

    ReactDOM.unmountComponentAtNode(container);

    renderHeader({ username: 'reader', image: '' });
    expect(container.querySelector('a[href="/privacy"]')).not.toBeNull();
  });

  it('links its table of contents to every section', () => {
    renderPrivacy();

    ['controller', 'processing', 'rights', 'complaint'].forEach(id => {
      const link = container.querySelector(`.privacy-toc a[href="#${id}"]`);
      expect(link).not.toBeNull();
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
  });

  it('renders the privacy page for the /privacy route', () => {
    window.localStorage.clear();

    const store = createStore(reducer, {
      common: {
        appName: 'Conduit',
        appLoaded: true,
        token: null,
        currentUser: null,
        viewChangeCounter: 0
      }
    });

    ReactDOM.render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/privacy']}>
          <App />
        </MemoryRouter>
      </Provider>,
      container
    );

    expect(container.querySelector('h1').textContent).toBe('Privacy Policy');
    expect(container.querySelector('a[href="/privacy"]')).not.toBeNull();
    expect(container.querySelector('footer.site-footer')).not.toBeNull();
    expect(container.querySelector('footer a[href="/privacy"]')).not.toBeNull();
  });
});
