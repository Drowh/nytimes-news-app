export interface MultimediaItem {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

export interface Article {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: MultimediaItem[];
  headline: {
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
  };
  keywords: Array<{
    name: string;
    value: string;
    rank: number;
    major: string;
  }>;
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name: string;
  byline: {
    original: string;
    person: Array<{
      firstname: string;
      middlename: string;
      lastname: string;
      qualifier: string;
      title: string;
      role: string;
      organization: string;
      rank: number;
    }>;
    organization: string;
  };
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface NewsResponse {
  status: string;
  copyright: string;
  response: {
    docs: Article[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface ArchiveResponse {
  status: string;
  copyright: string;
  response: {
    docs: Article[];
    meta: {
      hits: number;
      time: number;
    };
  };
}

export interface GroupedArticles {
  [date: string]: Article[];
}

export interface UIState {
  isSidebarOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface NewsState {
  articles: Article[];
  groupedArticles: GroupedArticles;
  lastFetchedMonth: string;
  isLoadingMore: boolean;
  hasMoreData: boolean;
}

export interface RootState {
  ui: UIState;
  news: NewsState;
}