import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Article, GroupedArticles, NewsState } from '@/types';

const initialState: NewsState = {
  articles: [],
  groupedArticles: {},
  lastFetchedMonth: '',
  isLoadingMore: false,
  hasMoreData: true,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
      state.groupedArticles = groupArticlesByDate(action.payload);
    },
    addArticles: (state, action: PayloadAction<Article[]>) => {
      const newArticles = action.payload.filter(
        (newArticle) => !state.articles.some((existing) => existing._id === newArticle._id)
      );
      state.articles = [...state.articles, ...newArticles];
      state.groupedArticles = groupArticlesByDate(state.articles);
    },
    addNewArticles: (state, action: PayloadAction<Article[]>) => {
      const newArticles = action.payload.filter(
        (newArticle) => !state.articles.some((existing) => existing._id === newArticle._id)
      );
      state.articles = [...newArticles, ...state.articles];
      state.groupedArticles = groupArticlesByDate(state.articles);
    },
    setLastFetchedMonth: (state, action: PayloadAction<string>) => {
      state.lastFetchedMonth = action.payload;
    },
    setLoadingMore: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMore = action.payload;
    },
    setHasMoreData: (state, action: PayloadAction<boolean>) => {
      state.hasMoreData = action.payload;
    },
  },
});

function groupArticlesByDate(articles: Article[]): GroupedArticles {
  const grouped: GroupedArticles = {};

  articles
    .sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime())
    .forEach((article) => {
      const date = new Date(article.pub_date).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(article);
    });

  return grouped;
}

export const {
  setArticles,
  addArticles,
  addNewArticles,
  setLastFetchedMonth,
  setLoadingMore,
  setHasMoreData,
} = newsSlice.actions;

export default newsSlice.reducer;