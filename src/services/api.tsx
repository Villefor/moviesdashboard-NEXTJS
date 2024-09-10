import { API_URL, API_SEARCH_URL, MOVIES_API_POPULAR_URL, TV_API_POPULAR_URL } from "../app/constants";
import { MovieTypes, PaginationTypes, TVShowTypes } from '../app/types';
import axios from 'axios';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
  }
};

export const fetchMovies = async (page: number): Promise<{ movies: MovieTypes[], totalPages: PaginationTypes["totalPages"], error: string | null }> => {
  try {
    const response = await axios.get(`${API_URL}api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`);

    if (response.data.results) {
      const MAX_PAGES = 500;
      const totalPages = Math.min(response.data.total_pages, MAX_PAGES);
      console.log(response.data);
      return { movies: response.data.results, totalPages,  error: null };
    } else {
      return { movies: [], totalPages: 0, error: 'Failed to fetch movies.' };
    }
  } catch (err) {
    console.error(err);
    return { movies: [], totalPages: 0, error: 'An error occurred while fetching data.' };
  }
};

export const searchMovies = async (query: string): Promise<MovieTypes[]> => {
  try {
    const response = await fetch(
      `${API_SEARCH_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(query)}`, 
    );
    const data = await response.json();

    if (data.results) {
      return  data.results;
    }
    else {
      throw new Error("Failed to fetch movies.");
    }
  } catch (err) {
    console.error(err);
    throw new Error("An error occurred while fetching data.");
  }
}

export const fetchSimilarMovies = async (id: number): Promise<MovieTypes[]> => {
  try {
    const response = await fetch(
      `${API_SEARCH_URL}/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
      options  
    );
    const data = await response.json();

    console.log(data)

    if (data.results) {
      return  data.results;
    }
    else {
      throw new Error("Failed to fetch movies.");
    }
  } catch (err) {
    console.error(err);
    throw new Error("An error occurred while fetching data.");
  }
}

export const fetchPopularMovies = async (page: number): Promise<{ movies: MovieTypes[], totalPages: PaginationTypes["totalPages"], error: string | null }> => {
  try {
    const response = await axios.get(`${MOVIES_API_POPULAR_URL}api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`);

    if (response.data.results) {
      const MAX_PAGES = 500;
      const totalPages = Math.min(response.data.total_pages, MAX_PAGES);
      console.log(response.data);
      return { movies: response.data.results, totalPages,  error: null };
    } else {
      return { movies: [], totalPages: 0, error: 'Failed to fetch movies.' };
    }
  } catch (err) {
    console.error(err);
    return { movies: [], totalPages: 0, error: 'An error occurred while fetching data.' };
  }
};

export const fetchTVShows = async (page: number): Promise<{ shows: TVShowTypes[], totalPages: PaginationTypes["totalPages"], error: string | null }> => {
  try {
    const response = await axios.get(`${TV_API_POPULAR_URL}api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`);

    if (response.data.results) {
      const MAX_PAGES = 500;
      const totalPages = Math.min(response.data.total_pages, MAX_PAGES);
      console.log(response.data);
      return { shows: response.data.results, totalPages,  error: null };
    } else {
      return { shows: [], totalPages: 0, error: 'Failed to fetch movies.' };
    }
  } catch (err) {
    console.error(err);
    return { shows: [], totalPages: 0, error: 'An error occurred while fetching data.' };
  }
};