'use client'
import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { MovieTypes } from '../types'; 
import { useMovies } from '../context/context';
import { fetchMovies } from '../../services/api';
import MovieModal from './MovieModal';
import styled from "styled-components";
import Pagination from './Pagination';
import LoadingSpinner from './SpinnerWrap';

const MovieList = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { moviesList, setMovies, currentPage, totalPages, setPage, setTotalPages } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<MovieTypes | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getMovies = async () => {
      const { movies, error, totalPages } = await fetchMovies(currentPage);
      if (error) {
        setError(error);
      } else {
        setMovies(movies);
        setTotalPages(totalPages);
      }
      setLoading(false);
    };

    getMovies();
  }, [currentPage]);

  const handleMovieClick = (movie: MovieTypes) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSelectedMovie(null);
    }, 300);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;
  if (!moviesList) return null;

  return (
    <Container>
      <Grid>
        {moviesList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
        ))}
      </Grid>
        <MovieModal
          movie={selectedMovie}
          modalOpen={modalOpen}
          onClose={closeModal}
      />
      <PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
        />
      </PaginationWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  width: 100%;
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default MovieList;
