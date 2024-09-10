"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { IMAGE_URL } from "../../constants";
import { MovieTypes } from "../../types";
import imageNotAvailable from '../../../assets/Image_not_available.png';

interface MovieLabeledValues {
  movie: MovieTypes;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieLabeledValues) {
  return (
    <Card onClick={onClick}>
      <Image
        src={movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : imageNotAvailable} 
        alt={
          movie.title ||
          movie.name ||
          movie.original_title ||
          movie.original_name
        }
        layout="responsive"
        priority={true}
        width={128}
        height={192}
        className={Poster}
      />
      <MovieTitle>
        {movie.title ||
          movie.name ||
          movie.original_title ||
          movie.original_name}
      </MovieTitle>
    </Card>
  );
}

const Card = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
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
