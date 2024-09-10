import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IMAGE_URL } from '../../constants';
import { MovieTypes } from '../../types';
import imageNotAvailable from '../../../assets/Image_not_available.png';

interface SimilarMoviesListProps {
  similarMovies: MovieTypes[];
  onMovieClick: (title: string) => void;
}

const SimilarMoviesList = ({ similarMovies, onMovieClick }: SimilarMoviesListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; 

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, similarMovies.length - itemsPerPage));
  };

  const visibleMovies = similarMovies.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <SimilarMoviesContainer>
      <h3>Filmes Similares:</h3>
      <Carousel>
        <ArrowButton onClick={handlePrevClick} disabled={currentIndex === 0}>&lt;</ArrowButton>
        <MoviesGrid>
          {visibleMovies.map((movie) => (
            <SimilarMovieCard key={movie.id} onClick={() => onMovieClick(movie.title || movie.name || movie.original_title || movie.original_name)}>
              <Image 
                src={movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : imageNotAvailable} 
                alt={movie.title || movie.name || movie.original_title || movie.original_name}  
                priority={true}
                width={150}
                height={120}           
              />
              <MovieTitle>{truncateTitle(movie.title || movie.name || movie.original_title || movie.original_name)}</MovieTitle>
            </SimilarMovieCard>
          ))}
        </MoviesGrid>
        <ArrowButton onClick={handleNextClick} disabled={currentIndex + itemsPerPage >= similarMovies.length}>&gt;</ArrowButton>
      </Carousel>
    </SimilarMoviesContainer>
  );
};

const truncateTitle = (title: string, maxLength: number = 20) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
};

const SimilarMoviesContainer = styled.div`
  margin-top: 20px;
`;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const MoviesGrid = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  padding: 0 25px; /* Adjust to make space for arrows */
`;

const SimilarMovieCard = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 0 0 auto;
  margin: 0 10px;

  img {
    border-radius: 8px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const MovieTitle = styled.p`
  text-align: center;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArrowButton = styled.button`
  background-color: #ff6347;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  transition: background-color 0.3s ease;
  
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  
  &:nth-of-type(1) {
    left: 10px;
  }
  
  &:nth-of-type(2) {
    right: 10px;
  }
`;

export default SimilarMoviesList;
