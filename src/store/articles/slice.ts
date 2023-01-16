import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchArticleItem, fetchArticles } from './asyncActions'
import { ArticleItem, ArticleState, Status } from '../../@types/articles'

const initialState: ArticleState = {
    articles: [],
    articleItem: null,
    status: Status.IDLE,
}

const articleSlice = createSlice({
    name: '@@articles',
    initialState,
    reducers: {
        setArticles: (state, action: PayloadAction<ArticleItem[]>) => {
            state.articles = action.payload
            state.status = Status.FULLFILED
        },
        setArticleItem: (state, action: PayloadAction<ArticleItem>) => {
            state.articleItem = action.payload
            state.status = Status.FULLFILED
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = Status.LOADING;
                state.articles = [];
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = Status.REJECTED;
                state.articles = [];
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = Status.FULLFILED;
                state.articles = action.payload;
            })
            .addCase(fetchArticleItem.pending, (state) => {
                state.status = Status.LOADING;
                state.articleItem = null;
            })
            .addCase(fetchArticleItem.rejected, (state, action) => {
                state.status = Status.REJECTED;
                state.articleItem = null;
            })
            .addCase(fetchArticleItem.fulfilled, (state, action) => {
                state.status = Status.FULLFILED;
                state.articleItem = action.payload;
            })
    },
})

export const articleReducer = articleSlice.reducer
export const {setArticleItem, setArticles} = articleSlice.actions