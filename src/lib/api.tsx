import {NewsArticle} from '../models/NewsArticle';
const axios = require('axios').default;

interface ResponseObject {
    hits: NewsArticle[]
}

interface Response {
    data: ResponseObject
}

//const url: String = "http://hn.algolia.com/api/v1/search_by_date?query=";
const urlLatest: String = "http://hn.algolia.com/api/v1/search_by_date?tags=story";

export async function loadArticlesInit (): Promise<NewsArticle[]> {
    try {
        const newsArticle: Response = await axios.get(urlLatest);
        return newsArticle.data.hits;
    } catch (error) {
        console.log('error', error);
        return [];
    }
}