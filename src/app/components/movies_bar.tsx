"use client";

import React, { useState } from "react";
import styled from "styled-components";

const Bar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  async function searchMovies(event: React.FormEvent) {
    event.preventDefault();
    // Handle the search logic
  }

  return (
    <SearchContainer>
      <SearchForm onSubmit={searchMovies}>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar filmes"
        />
        <SearchButton type="submit">Procurar</SearchButton>
      </SearchForm>
    </SearchContainer>
  );
};

export default Bar;

// Styled components

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 30px;
  padding: 5px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
`;

