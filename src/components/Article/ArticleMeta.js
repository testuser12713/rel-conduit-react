import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';
import { formatReadingTime } from '../../utils/readingTime';

const ArticleMeta = props => {
  const article = props.article;
  const readingTime = formatReadingTime(article.readingTime);
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
        {readingTime && (
          <span className="date">
            {' · '}
            {readingTime}
          </span>
        )}
      </div>

      <ArticleActions canModify={props.canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
