export type NewsArticle = {
    id: number,
    created_at: string,
    author: string,
    title: string,
    url: string,
    text: string,
    points: number,
    parent_id: number,
    children: NewsArticle[],
    totalPages?: number
};