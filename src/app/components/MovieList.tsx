'use client'
import React from 'react';
import MovieCard from './MovieCard';
import { MovieTypes } from '../types'; 
import {  useEffect, useState } from 'react';
import { useMovies } from '../context/context';
import { fetchMovies } from '../../services/api';
import styled from "styled-components";
import LoadingSpinner from './SpinnerWrap';

interface MovieLabeledValues {
  movies: MovieTypes[]; 
  handleMovieDetails: (movie: MovieTypes) => void; 
}

const MovieList = ({ handleMovieDetails }: MovieLabeledValues) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { moviesList, setMovies } = useMovies();

  useEffect(() => {
    const getMovies = async () => {
      const { movies, error } = await fetchMovies();
      if (error) {
        setError(error);
      } else {
        setMovies(movies);
      }
      setLoading(false);
    };

    getMovies();
  }, []);

  if (loading) return <LoadingSpinner/>;
  if (error) return <p>{error}</p>;

  if (!moviesList) return null;

  return (
    <Grid>
      {moviesList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieDetails(movie)} />
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 20px;
`;

export default MovieList;
