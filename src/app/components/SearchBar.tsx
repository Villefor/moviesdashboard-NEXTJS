"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { searchMovies, searchTvShows } from "../../services/api";
import { useMovies } from "../context/context";
import { usePathname } from "next/navigation";

const SearchForm = () => {
  const [query, setQuery] = useState<string>("");
  const { setPage, setTotalPages, setMovies, setTvShows } = useMovies();
  const pathname = usePathname(); 

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!query) return;

    try {
      if (pathname === "/tv_list") {
        const {shows, totalPages} = await searchTvShows(query); 
        setTvShows(shows); 
        setTotalPages(totalPages);
        setPage(1);
      } else {
        const {movies, totalPages} = await searchMovies(query); 
        setMovies(movies); 
        setTotalPages(totalPages);
        setPage(1);
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  }

  return (
    <Form onSubmit={handleSearch}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={pathname === "/tv_list" ? "Pesquisar séries" : "Pesquisar filmes"}
      />
      <Button type="submit">Procurar</Button>
    </Form>
  );
};

export default SearchForm;

const Form = styled.form`
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
    margin-top: 10%;
  }

  @media (max-width: 480px) {
    width: 90%;
    margin-top: 10%;
  }
`;

const Input = styled.input`
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

const Button = styled.button`
  background-color: black;
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
