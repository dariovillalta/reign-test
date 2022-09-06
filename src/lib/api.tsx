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

export async function loadArticlesInit (page?: number, framework?: string): Promise<NewsArticle[]> {
    try {
        let newsArticle: Response = await axios.get(urlLatest);
        if(page===undefined)
            newsArticle = await axios.get(urlLatest);
        else if(page!==undefined && !isNaN(page) && framework!==undefined && framework.length>0)
            newsArticle = ({data: {hits: await getArticles(page, framework).then(r => {return r}).catch(() => {{}})}}) as Response;
        let newsArticleTemp: NewsArticle[] = newsArticle.data.hits;
        let currentPage: number = 0;
        while (newsArticleTemp.length > 0){
            currentPage++;
            if(page===undefined)
                newsArticleTemp = (await getArticles(currentPage).then(r => {return r}).catch(() => {{}}) ) as NewsArticle[];
            else if(page!==undefined && !isNaN(page) && framework!==undefined && framework.length>0)
                newsArticleTemp = (await getArticles(currentPage, framework).then(r => {return r}).catch(() => {{}}) ) as NewsArticle[];
        }
        currentPage--;
        for (let index = 0; index < newsArticle.data.hits.length; index++) {
            newsArticle.data.hits[index].totalPages = currentPage;
        }
        return newsArticle.data.hits;
    } catch (error) {
        console.log('error', error);
        return [];
    }
}

export async function getArticles (page: Number, framework?: String): Promise<NewsArticle[]> {
    try {
        const newsArticle: Response = await axios.get(url+(framework!==undefined?'query='+framework+'&':'')+'page='+page);
        return newsArticle.data.hits;
    } catch (error) {
        console.log('error', error);
        return [];
    }
}