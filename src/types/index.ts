export interface HotComicItem {
  coverImg: string;
  title: string;
  type: string;
  latestChapter: string;
  rating: string;
  slug: string;
}

export interface ComicListItem {
  title: string;
  slug: string;
  coverImg: string;
  type: string;
  completed: boolean;
  rating: string;
  latestChapter: string;
}

export interface Genre {
  name: string;
  count: string;
  slug: string;
}

export interface Chapter {
  number: string;
  slug: string;
  date: string;
}

export interface ComicDetailData {
  title: string;
  coverImg: string;
  alternativeTitle: string;
  genres: {
    name: string;
    slug: string;
  }[];
  released: string;
  status: string;
  totalChapter: string;
  author: string;
  type: string;
  rating: string;
  synopsis: string;
  chapters: Chapter[];
}

export interface FavoriteItem {
  title: string;
  slug: string;
  coverImg: string;
  type: string;
}

export interface HistoryItem {
  seriesTitle: string;
  seriesSlug: string;
  coverImg: string;
  chapterNumber: string;
  chapterSlug: string;
}

export interface HistoryChapterItem {
  chapterNumber: string;
  chapterSlug: string;
}

export interface ChapterData {
  chapterTitle: string;
  chapterNumber: string;
  seriesTitle: string;
  seriesSlug: string;
  previousChapterSlug: string | null;
  nextChapterSlug: string | null;
  imageChapters: string[];
}
