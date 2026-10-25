import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  ASYNC_START
} from '../constants/actionTypes';

const LIST_ACTIONS = [
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_LOADED
];

const errorsOf = action => (action.payload && action.payload.errors) || null;

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_FAVORITED:
    case ARTICLE_UNFAVORITED:
      if (action.error) {
        return { ...state, errors: errorsOf(action) };
      }
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount
            };
          }
          return article;
        })
      };
    case ASYNC_START:
      if (LIST_ACTIONS.indexOf(action.subtype) !== -1) {
        return { ...state, errors: null, loading: true };
      }
      return state;
    case SET_PAGE:
      if (action.error) {
        return { ...state, errors: errorsOf(action), loading: false };
      }
      return {
        ...state,
        errors: null,
        loading: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page
      };
    case APPLY_TAG_FILTER:
      if (action.error) {
        return { ...state, errors: errorsOf(action), loading: false };
      }
      return {
        ...state,
        errors: null,
        loading: false,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case HOME_PAGE_LOADED:
      if (action.error) {
        return { ...state, errors: errorsOf(action), loading: false };
      }
      return {
        ...state,
        errors: null,
        loading: false,
        pager: action.pager,
        tags: action.payload[0].tags,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0,
        tab: action.tab
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      if (action.error) {
        return { ...state, errors: errorsOf(action), loading: false };
      }
      return {
        ...state,
        errors: null,
        loading: false,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      if (action.error) {
        return { ...state, errors: errorsOf(action), loading: false };
      }
      return {
        ...state,
        errors: null,
        loading: false,
        pager: action.pager,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
