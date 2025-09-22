import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ArchiveResponse } from '@/types';

const API_KEY = import.meta.env.VITE_NYTIMES_API_KEY;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/svc/archive/v1/',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getArchiveNews: builder.query<ArchiveResponse, { year: number; month: number }>({
      query: ({ year, month }) => `${year}/${month}.json?api-key=${API_KEY}`,
      providesTags: ['News'],
      transformErrorResponse: (response: any) => {
        console.error('NY Times API Error:', response);
        if (response.status === 401) {
          return { message: 'Неверный API ключ NY Times' };
        }
        if (response.status === 403) {
          return { message: 'Доступ к NY Times API запрещен' };
        }
        if (response.status === 429) {
          return { message: 'Превышен лимит запросов к NY Times API' };
        }
        if (response.status >= 500) {
          return { message: 'Сервер NY Times недоступен' };
        }
        return { message: 'Ошибка загрузки новостей' };
      },
    }),
  }),
});

export const { useGetArchiveNewsQuery, useLazyGetArchiveNewsQuery } = newsApi;