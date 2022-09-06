export type NewsArticle = {
    objectID: string,
    created_at: string,
    author: string,
    title: string,
    story_title: string,
    url: string,
    story_url: string,
    text: string,
    points: number,
    parent_id: number,
    children: NewsArticle[],
    totalPages?: number,
    liked?: boolean
};