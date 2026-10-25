import { describe, it, expect } from 'vitest';
import reducer from './articleList';
import {
  ASYNC_START,
  APPLY_TAG_FILTER,
  CHANGE_TAB,
  HOME_PAGE_LOADED,
  PROFILE_PAGE_LOADED,
  SET_PAGE
} from '../constants/actionTypes';

const NETWORK_ERROR = {
  errors: {
    network: ['Cannot reach the API. Check your connection and try again.']
  }
};

const articles = [{ slug: 'a-post' }];

describe('articleList reducer', () => {
  it('stores the error payload of a failed home list request and keeps the existing articles', () => {
    const state = { articles, articlesCount: 1, loading: true };

    expect(reducer(state, {
      type: HOME_PAGE_LOADED,
      error: true,
      payload: NETWORK_ERROR
    })).toEqual({
      ...state,
      errors: NETWORK_ERROR.errors,
      loading: false
    });
  });

  it('stores the error payload of a failed page, tag, tab and profile request', () => {
    [
      { type: SET_PAGE, page: 1 },
      { type: APPLY_TAG_FILTER, tag: 'react' },
      { type: CHANGE_TAB, tab: 'all' },
      { type: PROFILE_PAGE_LOADED }
    ].forEach(action => {
      const next = reducer({ articles }, {
        ...action,
        error: true,
        payload: NETWORK_ERROR
      });

      expect(next.errors).toEqual(NETWORK_ERROR.errors);
      expect(next.articles).toEqual(articles);
      expect(next.loading).toBe(false);
    });
  });

  it('falls back to null when a failed action carries no error payload', () => {
    const next = reducer({ articles }, {
      type: HOME_PAGE_LOADED,
      error: true,
      payload: null
    });

    expect(next.errors).toBeNull();
  });

  it('clears the stored error and starts loading when a list request starts', () => {
    const state = { articles, errors: NETWORK_ERROR.errors };

    expect(reducer(state, {
      type: ASYNC_START,
      subtype: HOME_PAGE_LOADED
    })).toEqual({
      ...state,
      errors: null,
      loading: true
    });
  });

  it('leaves state untouched for an unrelated async start', () => {
    const state = { articles, errors: NETWORK_ERROR.errors };

    expect(reducer(state, {
      type: ASYNC_START,
      subtype: 'LOGIN'
    })).toBe(state);
  });

  it('clears the stored error when a list request succeeds', () => {
    const state = { errors: NETWORK_ERROR.errors, loading: true };
    const next = reducer(state, {
      type: HOME_PAGE_LOADED,
      tab: 'all',
      pager: () => {},
      payload: [{ tags: ['react'] }, { articles, articlesCount: 1 }]
    });

    expect(next.errors).toBeNull();
    expect(next.loading).toBe(false);
    expect(next.articles).toEqual(articles);
    expect(next.articlesCount).toBe(1);
    expect(next.tags).toEqual(['react']);
    expect(next.tab).toBe('all');
  });

  it('keeps an unrelated action unchanged', () => {
    const state = { articles };

    expect(reducer(state, { type: 'UNKNOWN' })).toBe(state);
  });
});
