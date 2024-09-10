"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import styled from 'styled-components';
import { TVShowTypes } from '../types'; 
import { fetchTVShows } from '../../services/api';
import LoadingSpinner from '@/app/components/SpinnerWrap';
import TVShowList from '../components/Tvs/TVShowList';
import { useMovies } from '@/app/context/context';

const TVList = () => {
  const [tvShows, setTVShows] = useState<TVShowTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    tvPages,
    setTvTotalPages,
  } = useMovies();

  useEffect(() => {
    const getMovies = async () => {
      const { shows, error, totalPages } = await fetchTVShows(tvPages);
      if (error) {
        setError(error);
      } else {
        setTVShows(shows);
        setTvTotalPages(totalPages);
      }
      setLoading(false);
    };

    getMovies();
  }, [tvPages]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <PageContainer>
      <Navbar />
      <Content>
        <h1>TV Shows</h1>
        <TVShowList tvShows={tvShows} />
      </Content>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 2rem;
  flex: 1;
`;

export default TVList;
