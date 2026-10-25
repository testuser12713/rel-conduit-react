import ReactDOM from 'react-dom';
import React from 'react';
import { resolveApiRoot } from './config';

const rootElement = document.getElementById('root');

const renderStartupError = error => {
  const container = document.createElement('div');
  container.setAttribute('role', 'alert');

  const heading = document.createElement('h1');
  heading.textContent = 'Configuration error';

  const message = document.createElement('p');
  message.textContent = (error && error.message) ||
    'REACT_APP_API_ROOT is missing or invalid. Set it to the absolute http(s) URL of the API.';

  container.appendChild(heading);
  container.appendChild(message);

  rootElement.textContent = '';
  rootElement.appendChild(container);
};

const renderApp = () => {
  const { Provider } = require('react-redux');
  const { Route, Switch } = require('react-router-dom');
  const { ConnectedRouter } = require('react-router-redux');

  const { store, history } = require('./store');
  const App = require('./components/App').default;

  ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>

  ), rootElement);
};

try {
  resolveApiRoot();
  renderApp();
} catch (error) {
  renderStartupError(error);
}
