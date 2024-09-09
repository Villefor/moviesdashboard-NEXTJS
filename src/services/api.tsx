import { API_URL } from "../app/constants";
import { MovieTypes } from '../app/types';
import axios from 'axios';

export const fetchMovies = async (): Promise<{ movies: MovieTypes[], error: string | null }> => {
  try {
    const response = await axios.get(`${API_URL}api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`);

    if (response.data.results) {
      console.log(response.data.results);
      return { movies: response.data.results, error: null };
    } else {
      return { movies: [], error: 'Failed to fetch movies.' };
    }
  } catch (err) {
    console.error(err);
    return { movies: [], error: 'An error occurred while fetching data.' };
  }
};

export const searchMovies = async (query: string): Promise<MovieTypes[]> => {
  try {
    const response = await fetch(
      `${API_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(query)}}`, 
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
