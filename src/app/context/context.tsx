'use client'
import React, { createContext, useState, ReactNode, useContext } from "react";
import { MovieTypes } from "../types";

interface MovieContextProps {
  moviesList: MovieTypes[];
  setMovies: React.Dispatch<React.SetStateAction<MovieTypes[]>>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [moviesList, setMovies] = useState<MovieTypes[]>([]); 

  return (
    <MovieContext.Provider value={{ moviesList, setMovies }}>
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
