export type NewsArticle = {
    objectID: number,
    created_at: string,
    author: string,
    title?: string,
    story_title?: string,
    url: string,
    text: string,
    points: number,
    parent_id: number,
    children: NewsArticle[],
    totalPages?: number,
    liked?: boolean
};