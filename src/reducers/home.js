import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  ASYNC_START
} from '../constants/actionTypes';

const errorsOf = action => (action.payload && action.payload.errors) || null;

export default (state = {}, action) => {
  switch (action.type) {
    case ASYNC_START:
      if (action.subtype === HOME_PAGE_LOADED) {
        return { ...state, errors: null, loading: true };
      }
      return state;
    case HOME_PAGE_LOADED:
      if (action.error) {
        return {
          ...state,
          tags: state.tags || [],
          errors: errorsOf(action),
          loading: false
        };
      }
      return {
        ...state,
        errors: null,
        loading: false,
        tags: action.payload[0].tags
      };
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
