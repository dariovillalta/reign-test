const axios = require('axios').default;

type NewsArticle = {
    id: number,
    created_at: string,
    author: string,
    title: string,
    url: string,
    text: string,
    points: number,
    parent_id: number,
    children: NewsArticle[]
}

//const url: String = "http://hn.algolia.com/api/v1/search_by_date?query=";
const url: String = "http://hn.algolia.com/api/v1/search_by_date?tags=story";

export async function totalPages (): Promise<NewsArticle[]> {
    try {
        const newsArticle: NewsArticle[] = await axios.get(url);
        console.log('newsArticle', newsArticle)
        return newsArticle;
    } catch (error) {
        console.log('error', error);
        return [];
    }
}