export function formatReadingTime(readingTime) {
  if (!Number.isInteger(readingTime) || readingTime < 1) {
    return null;
  }
  return `${readingTime} min read`;
}
