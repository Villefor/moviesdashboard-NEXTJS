"use client";

import React, { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api"; 
import styled from "styled-components";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MovieGrid>
      {movies.map((movie) => (
        <MovieCard key={movie.id}>
          <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <MovieTitle>{movie.title}</MovieTitle>
          <Rating>{movie.vote_average}/10</Rating>
          <Overview>{movie.overview}</Overview>
        </MovieCard>
      ))}
    </MovieGrid>
  );
};

export default MoviesList;

// Styled Components
const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const MovieCard = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
`;

const MovieTitle = styled.h2`
  font-size: 18px;
  margin: 10px 0;
  padding: 0 10px;
`;

const Rating = styled.p`
  font-weight: bold;
  padding: 0 10px;
`;

const Overview = styled.p`
  padding: 10px;
  font-size: 14px;
  color: #555;
`;
