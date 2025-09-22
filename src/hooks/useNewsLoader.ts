import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetArchiveNewsQuery } from '@/store/api';
import {
  setArticles,
  addArticles,
  addNewArticles,
  setLastFetchedMonth,
  setLoadingMore,
  setHasMoreData,
} from '@/store/slices/newsSlice';
import { setLoading, setError } from '@/store/slices/uiSlice';
import type { RootState } from '@/store';

export const useNewsLoader = () => {
  const dispatch = useDispatch();
  const { articles, lastFetchedMonth, hasMoreData } = useSelector((state: RootState) => state.news);
  const [getArchiveNews, { isLoading }] = useLazyGetArchiveNewsQuery();

  const loadInitialNews = useCallback(async () => {
    try {
      // Debug: Check API key availability
      const apiKey = import.meta.env.VITE_NYTIMES_API_KEY;
      console.log('API Key available:', !!apiKey);
      console.log('API Key preview:', apiKey?.substring(0, 10) + '...');

      dispatch(setLoading(true));
      dispatch(setError(null));

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      const year = currentYear > 2024 ? 2024 : currentYear;
      const month = currentYear > 2024 ? 12 : Math.min(currentMonth, 12); 

      const result = await getArchiveNews({ year, month }).unwrap();

      if (result.response?.docs) {
        const sortedArticles = result.response.docs
          .filter(article => article.abstract && article.web_url)
          .sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime());

        dispatch(setArticles(sortedArticles));
        dispatch(setLastFetchedMonth(`${year}-${month.toString().padStart(2, '0')}`));
      }

    } catch  {
      dispatch(setError('Не удалось загрузить новости'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, getArchiveNews]);

  const loadMoreNews = useCallback(async () => {
    if (!hasMoreData || isLoading) return;

    try {
      dispatch(setLoadingMore(true));

      const [year, month] = lastFetchedMonth.split('-').map(Number);
      let prevYear = year;
      let prevMonth = month - 1;

      if (prevMonth === 0) {
        prevMonth = 12;
        prevYear = year - 1;
      }

      const result = await getArchiveNews({ year: prevYear, month: prevMonth }).unwrap();

      if (result.response?.docs && result.response.docs.length > 0) {
        const sortedArticles = result.response.docs
          .filter(article => article.abstract && article.web_url)
          .sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime());

        if (sortedArticles.length > 0) {
          dispatch(addArticles(sortedArticles));
          dispatch(setLastFetchedMonth(`${prevYear}-${prevMonth.toString().padStart(2, '0')}`));
        } else {
          dispatch(setHasMoreData(false));
        }
      } else {
        dispatch(setHasMoreData(false));
      }
    } catch (error) {
      console.warn(`Не удалось загрузить данные:`, error);
      dispatch(setHasMoreData(false));
    } finally {
      dispatch(setLoadingMore(false));
    }
  }, [dispatch, getArchiveNews, hasMoreData, isLoading, lastFetchedMonth]);

  const loadLatestNews = useCallback(async () => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      const year = currentYear > 2024 ? 2024 : currentYear;
      const month = currentYear > 2024 ? 12 : Math.min(currentMonth, 12);

      const result = await getArchiveNews({ year, month }).unwrap();

      if (result.response?.docs) {
        const sortedArticles = result.response.docs
          .filter(article => article.abstract && article.web_url)
          .sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime());

        const latestArticles = sortedArticles.filter(article => {
          const articleDate = new Date(article.pub_date);
          const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
          return articleDate > thirtySecondsAgo;
        });

        if (latestArticles.length > 0) {
          dispatch(addNewArticles(latestArticles));
        }
      }
    } catch {
      dispatch(setError('Не удалось загрузить новости'));
    }
  }, [dispatch, getArchiveNews]);

  useEffect(() => {
    if (articles.length === 0) {
      loadInitialNews();
    }
  }, [articles.length, loadInitialNews]);

  useEffect(() => {
    const interval = setInterval(loadLatestNews, 30000);
    return () => clearInterval(interval);
  }, [loadLatestNews]);

  return {
    loadMoreNews,
    isLoading,
  };
};