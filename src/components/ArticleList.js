import ArticlePreview from './ArticlePreview';
import ListErrors from './ListErrors';
import ListPagination from './ListPagination';
import React from 'react';

const ArticleList = props => {
  if (props.errors) {
    return (
      <div>
        <ListErrors errors={props.errors} />
        {props.onRetry && (
          <button className="btn btn-outline-primary" onClick={props.onRetry}>
            Try again
          </button>
        )}
      </div>
    );
  }

  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.articles.map(article => {
          return (
            <ArticlePreview article={article} key={article.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default ArticleList;
