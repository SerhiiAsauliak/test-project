import { RootState } from "../store";

export const selectArticleData = (state: RootState) => state.articles;
export const selectArticleItem = (state: RootState) => state.articles.articleItem;
export const selectArticleItemById = (id: string) => (state: RootState) => state.articles.articles.find(el => el.id === id);