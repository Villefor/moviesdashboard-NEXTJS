// components/TVShowList.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { TVShowTypes } from '../../types';
import { IMAGE_URL } from '../../constants';
import imageNoAvailable from '../../../assets/Image_not_available.png'

interface TVShowListProps {
  tvShows: TVShowTypes[];
}

const truncateTitle = (title: string, maxLength: number = 20) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
};


const TVShowList = ({ tvShows }: TVShowListProps) => {
  return (
    <TVShowsContainer>
      <TVShowsGrid>
        {tvShows.map((show) => (
          <TVShowCard key={show.id}>
            <Image 
              src={show.poster_path ? `${IMAGE_URL}${show.poster_path}` : imageNoAvailable} // Adjust path as needed
              alt={show.original_name || show.name}
              layout='responsive'
              width={150}
              height={120}
            />
            <ShowTitle>{truncateTitle(show.original_name || show.name)}</ShowTitle>
          </TVShowCard>
        ))}
      </TVShowsGrid>
    </TVShowsContainer>
  );
};


const TVShowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TVShowsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  width: 100%;
`;

const TVShowCard = styled.div`
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

const ShowTitle = styled.p`
  text-align: center;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default TVShowList;
