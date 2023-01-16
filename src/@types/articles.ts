export type ArticleItem = {
    id: string,
    title: string,
    url: string,
    imageUrl: string,
    newsSite: string,
    summary: string,
    publishedAt: string,
    updatedAt: string,
    featured: false,
    launches: [],
    events: []
}

export enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    FULLFILED = 'fullfiled',
    REJECTED = 'rejected',
}

export type ArticleState = {
    articles: ArticleItem[],
    articleItem: ArticleItem | null,
    status: Status,
}