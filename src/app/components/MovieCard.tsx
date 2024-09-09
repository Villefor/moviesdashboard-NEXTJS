'use client'  

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { IMAGE_URL } from "../constants";
import { MovieTypes } from '../types'; 

interface MovieLabeledValues {
  movie: MovieTypes;
  onClick: () => void;
}

export default function MovieCard({movie, onClick}: MovieLabeledValues) {

  return (
        <Card key={movie.id}>
          <Image 
            src={`${IMAGE_URL}${movie.poster_path}`} 
            alt={movie.title || movie.name  || movie.original_title   || movie.original_name}  
            layout="responsive"
            priority={true}
            width={128}
            height={192}
            objectFit="cover"
            className={Poster}            
            />
          <MovieTitle>{movie.title || movie.name  || movie.original_title   || movie.original_name}</MovieTitle>
          <Rating>{movie.vote_average}/10</Rating>
          <Overview>{movie.overview}</Overview>
        </Card>
  );
}

const Card = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Poster = styled.img`
  width={158}
  height={192}
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
