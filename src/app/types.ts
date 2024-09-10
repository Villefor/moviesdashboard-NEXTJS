export interface MovieTypes {
  id: number;
  name: string;
  title: string;
  original_title: string;
  original_name: string;
  first_air_date: string;
  original_language: string;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export interface PaginationTypes {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}
