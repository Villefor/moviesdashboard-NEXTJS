"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { searchMovies } from "../services/api";
import { useMovies } from "./context/context";
import MovieList from "./components/MovieList";
import { MovieTypes } from "./types";
import NavBar from "./components/NavBar";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const { moviesList, setMovies } = useMovies();

  async function handleSearchMovies(event: React.FormEvent) {
    event.preventDefault();
    if (!query) return;
    const results = await searchMovies(query);
    setMovies(results);
  }

  function handleMovieDetails(movie: MovieTypes) {
    // Implement the logic to handle movie details
    console.log(movie);
  }

  return (
    <Container>
      <NavBar />
      <Content>
        <SearchForm onSubmit={handleSearchMovies}>
          <SearchInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar filmes"
          />
          <SearchButton type="submit">Procurar</SearchButton>
        </SearchForm>
        <MovieList movies={moviesList} handleMovieDetails={handleMovieDetails} />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  margin-top: 10%;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin: 0 auto;
  background-color: #f0f0f0;
  border-radius: 30px;
  padding: 10px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 30px;
  padding: 10px;
  width: 300px;
  font-size: 16px;
  outline: none;

  &:focus {
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const SearchButton = styled.button`
  background-color: #ff6347;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff4500;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

