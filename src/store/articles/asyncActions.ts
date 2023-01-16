import { createAsyncThunk } from '@reduxjs/toolkit'
import { ArticleItem } from '../../@types/articles';
import { BASE_URL } from '../../config';
import { useHttp } from './../../hooks/useHttp';


export const fetchArticles = createAsyncThunk<ArticleItem[], string>(
    '@@articles/fetchAllArticles', 
    async (param) => {
        const {request} = useHttp()
        let url = BASE_URL
        if(param) {
            url = `${url}?search=${param}` 
        }
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

