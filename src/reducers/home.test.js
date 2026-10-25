import { describe, it, expect } from 'vitest';
import reducer from './home';
import { ASYNC_START, HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

const NETWORK_ERROR = {
  errors: {
    network: ['Cannot reach the API. Check your connection and try again.']
  }
};

describe('home reducer', () => {
  it('stores the error payload of a failed home request and ends loading', () => {
    const state = { tags: ['react'], loading: true };

    expect(reducer(state, {
      type: HOME_PAGE_LOADED,
      error: true,
      payload: NETWORK_ERROR
    })).toEqual({
      tags: ['react'],
      errors: NETWORK_ERROR.errors,
      loading: false
    });
  });

  it('falls back to an empty tag list when the first request fails', () => {
    const next = reducer({}, {
      type: HOME_PAGE_LOADED,
      error: true,
      payload: NETWORK_ERROR
    });

    expect(next.tags).toEqual([]);
    expect(next.errors).toEqual(NETWORK_ERROR.errors);
    expect(next.loading).toBe(false);
  });

  it('clears the stored error and starts loading when the home list request starts', () => {
    const state = { tags: ['react'], errors: NETWORK_ERROR.errors };

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
    const state = { tags: ['react'], errors: NETWORK_ERROR.errors };

    expect(reducer(state, {
      type: ASYNC_START,
      subtype: 'LOGIN'
    })).toBe(state);
  });

  it('clears the stored error when the home list request succeeds', () => {
    const state = { errors: NETWORK_ERROR.errors, loading: true };
    const next = reducer(state, {
      type: HOME_PAGE_LOADED,
      payload: [{ tags: ['react', 'redux'] }, { articles: [], articlesCount: 0 }]
    });

    expect(next.errors).toBeNull();
    expect(next.loading).toBe(false);
    expect(next.tags).toEqual(['react', 'redux']);
  });

  it('resets the slice when the home page unloads', () => {
    expect(reducer({
      tags: ['react'],
      errors: NETWORK_ERROR.errors,
      loading: true
    }, { type: HOME_PAGE_UNLOADED })).toEqual({});
  });

  it('keeps an unrelated action unchanged', () => {
    const state = { tags: ['react'] };

    expect(reducer(state, { type: 'UNKNOWN' })).toBe(state);
  });
});
