"use client";

import React from "react";
import styled from "styled-components";
import MovieList from "./components/Movies/MovieList";
import NavBar from "./components/NavBar";
import SearchForm from "./components/SearchBar";

export default function Home() {


  return (
    <Container>
      <NavBar />
      <Content>
        <SearchForm />
        <MovieList />
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

