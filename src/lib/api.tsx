import {NewsArticle} from '../models/NewsArticle';
const axios = require('axios').default;

interface ResponseObject {
    hits: NewsArticle[]
}

interface Response {
    data: ResponseObject
}

const url: String = "http://hn.algolia.com/api/v1/search_by_date?";
const urlLatest: String = "http://hn.algolia.com/api/v1/search_by_date?tags=story";

export async function loadArticlesInit (): Promise<NewsArticle[]> {
    try {
        const newsArticle: Response = await axios.get(urlLatest);
        let newsArticleTemp: NewsArticle[] = newsArticle.data.hits;
        let currentPage: number = 0;
        while (newsArticleTemp.length > 0){
            newsArticleTemp = (await getArticles(currentPage).then(r => {return r}).catch(() => {{}}) ) as NewsArticle[];
            currentPage++;
        }
        newsArticle.data.hits[0].totalPages = currentPage;
        return newsArticle.data.hits;
    } catch (error) {
        console.log('error', error);
        return [];
    }
}

export async function getArticles (page: Number, framework?: String): Promise<NewsArticle[]> {
    try {
    const newsArticle: Response = await axios.get(url+(framework!==undefined?'query='+framework+'&':'')+'page='+page);
        console.log('newsArticle', newsArticle);
        return newsArticle.data.hits;
    } catch (error) {
        console.log('error', error);
        return [];
    }
}