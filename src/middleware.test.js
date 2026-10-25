import { describe, it, expect, vi } from 'vitest';
import { applyMiddleware, createStore as createReduxStore } from 'redux';
import { promiseMiddleware } from './middleware';
import { ASYNC_END, ASYNC_START, HOME_PAGE_LOADED } from './constants/actionTypes';
import reducer from './reducer';

const NETWORK_ERROR = {
  errors: {
    network: ['Cannot reach the API. Check your connection and try again.']
  }
};

const createStore = () => {
  const dispatched = [];
  const store = {
    getState: () => ({ viewChangeCounter: 0 }),
    dispatch: vi.fn(action => dispatched.push(action))
  };

  return { store, dispatched };
};

const dispatchWithPromise = (store, action) => {
  const next = vi.fn();
  promiseMiddleware(store)(next)(action);

  return new Promise(resolve => setTimeout(resolve, 0));
};

describe('promiseMiddleware', () => {
  it('turns a rejection without a response into the network error envelope and ends the request', async () => {
    const { store, dispatched } = createStore();
    const action = {
      type: 'HOME_PAGE_LOADED',
      payload: Promise.reject(new Error('Network Error'))
    };

    await dispatchWithPromise(store, action);

    expect(dispatched[0]).toEqual({ type: ASYNC_START, subtype: 'HOME_PAGE_LOADED' });
    expect(dispatched[1]).toEqual({ type: ASYNC_END, promise: NETWORK_ERROR });
    expect(dispatched[2]).toMatchObject({
      type: 'HOME_PAGE_LOADED',
      error: true,
      payload: NETWORK_ERROR
    });
  });

  it('uses the response body of a rejected request that has a response', async () => {
    const { store, dispatched } = createStore();
    const body = { errors: { title: ['must not be blank'] } };
    const failure = new Error('Unprocessable Entity');
    failure.response = { body };

    const action = {
      type: 'ARTICLE_SUBMITTED',
      payload: Promise.reject(failure)
    };

    await dispatchWithPromise(store, action);

    expect(dispatched[1]).toEqual({ type: ASYNC_END, promise: body });
    expect(dispatched[2]).toMatchObject({
      type: 'ARTICLE_SUBMITTED',
      error: true,
      payload: body
    });
  });

  it('leaves the success path unchanged', async () => {
    const { store, dispatched } = createStore();
    const body = { article: { slug: 'a-post' } };
    const action = {
      type: 'ARTICLE_PAGE_LOADED',
      payload: Promise.resolve(body)
    };

    await dispatchWithPromise(store, action);

    expect(dispatched[0]).toEqual({ type: ASYNC_START, subtype: 'ARTICLE_PAGE_LOADED' });
    expect(dispatched[1]).toEqual({ type: ASYNC_END, promise: body });
    expect(dispatched[2]).toMatchObject({
      type: 'ARTICLE_PAGE_LOADED',
      payload: body
    });
    expect(dispatched[2].error).toBeUndefined();
  });

  it('leaves the home article list in its error state when a request never answers', async () => {
    const store = createReduxStore(reducer, applyMiddleware(promiseMiddleware));
    const action = {
      type: HOME_PAGE_LOADED,
      tab: 'all',
      payload: Promise.all([
        Promise.reject(new Error('Network Error')),
        Promise.reject(new Error('Network Error'))
      ])
    };

    expect(() => store.dispatch(action)).not.toThrow();

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(store.getState().articleList.errors).toEqual(NETWORK_ERROR.errors);
    expect(store.getState().home.tags).toEqual([]);
  });
});
