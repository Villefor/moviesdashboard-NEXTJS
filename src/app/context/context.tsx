"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { MovieTypes, PaginationTypes, TVShowTypes } from "../types";

interface MovieContextProps {
  tvPages: PaginationTypes["currentPage"];
  setTvPages: React.Dispatch<React.SetStateAction<number>>;
  currentPage: PaginationTypes["currentPage"];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  tvTotalPages: PaginationTypes["totalPages"];
  totalPages: PaginationTypes["totalPages"];
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setTvTotalPages: React.Dispatch<React.SetStateAction<number>>;
  moviesList: MovieTypes[];
  tvShowsList : TVShowTypes[];
  setTvShows: React.Dispatch<React.SetStateAction<TVShowTypes[]>>;
  setMovies: React.Dispatch<React.SetStateAction<MovieTypes[]>>;
  setPage: (page: number) => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [moviesList, setMovies] = useState<MovieTypes[]>([]);
  const [tvShowsList, setTvShows] = useState<TVShowTypes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [tvPages, setTvPages] = useState<number>(1);
  const [tvTotalPages, setTvTotalPages] = useState<number>(1);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MovieContext.Provider
      value={{
        moviesList,
        setMovies,
        tvShowsList,
        setTvShows,
        currentPage,
        tvPages,
        tvTotalPages,
        setTvPages,
        setCurrentPage,
        totalPages,
        setTotalPages,
        setTvTotalPages,
        setPage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};

export default MovieContext;
