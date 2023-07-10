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
