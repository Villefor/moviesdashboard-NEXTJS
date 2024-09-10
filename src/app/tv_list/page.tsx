"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import styled from 'styled-components';
import { fetchTVShows } from '../../services/api';
import LoadingSpinner from '@/app/components/SpinnerWrap';
import TVShowList from '../components/Tvs/TVShowList';
import { useMovies } from '@/app/context/context';
import SearchBar from '../components/SearchBar';
import Pagination from '../../app/components/Movies/Pagination';

const TVList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    tvShowsList,
    setTvShows,
    setTotalPages,
    currentPage,
    totalPages,
    setPage,
  } = useMovies();

  useEffect(() => {
    const getTvShows = async () => {
      const { shows, error, totalPages } = await fetchTVShows(currentPage);
      if (error) {
        setError(error);
      } else {
        setTvShows(shows);
        setTotalPages(totalPages);
      }
      setLoading(false);
    };

    getTvShows();
  }, [currentPage]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <PageContainer>
      <Navbar />
      <Content>
      <SearchBar />
        <TVShowList tvShows={tvShowsList} />
      </Content>
      <PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
        />
      </PaginationWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  padding: 2rem;
  flex: 1;
  margin-top: 10%;
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;


export default TVList;
