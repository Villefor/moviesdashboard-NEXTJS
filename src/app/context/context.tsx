'use client'
import React, { createContext, useState, ReactNode, useContext } from "react";
import { MovieTypes, PaginationTypes } from "../types";

interface MovieContextProps {
  currentPage: PaginationTypes["currentPage"];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: PaginationTypes["totalPages"];
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  moviesList: MovieTypes[];
  setMovies: React.Dispatch<React.SetStateAction<MovieTypes[]>>;
  setPage: (page: number) => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [moviesList, setMovies] = useState<MovieTypes[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MovieContext.Provider value={{ moviesList, setMovies, currentPage, setCurrentPage, totalPages, setTotalPages, setPage }}>
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export default MovieContext;
