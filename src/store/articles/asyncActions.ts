import { createAsyncThunk } from '@reduxjs/toolkit'
import { ArticleItem } from '../../@types/articles';
import { BASE_URL } from '../../config';
import { useHttp } from './../../hooks/useHttp';


export const fetchArticles = createAsyncThunk(
    '@@articles/fetchAllArticles', 
    async () => {
        const {request} = useHttp()
        let url = BASE_URL
        const res = await request(url)
        return res
})

export const fetchArticleItem = createAsyncThunk<ArticleItem, string>(
    '@@article/fetchArticle', 
    async (id) => {
        const {request} = useHttp()
        const res = await request(`${BASE_URL}/${id}`);
        return res
})

