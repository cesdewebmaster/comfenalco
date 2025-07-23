export const URL_SEARCHER =
  process.env.ENVIRONMENT === "PDN"
    ? "https://api.oriondevs.lat/api/v1/search-article"
    : process.env.ENVIRONMENT === "QA"
    ? "https://api.oriondevs.lat/api/v1/search-article"
    : "https://api.oriondevs.lat/api/v1/search-article"

export const URL_ARTICLE_RATING =
  process.env.ENVIRONMENT === "PDN"
    ? "https://api.oriondevs.lat/api/v1/rating-article"
    : process.env.ENVIRONMENT === "QA"
    ? "https://api.oriondevs.lat/api/v1/rating-article"
    : "https://api.oriondevs.lat/api/v1/rating-article"

