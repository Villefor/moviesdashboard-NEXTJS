import React from "react";
import styled from "styled-components";
import { PaginationTypes } from "../../types";
import { fetchMovies } from "../../../services/api";

interface PaginationProps {
  currentPage: PaginationTypes["currentPage"];
  totalPages: PaginationTypes["totalPages"];
  setPage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, setPage }: PaginationProps) => {
  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
      await fetchMovies(currentPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const range = 2;
  const startPage = Math.max(1, currentPage - range);
  const endPage = Math.min(totalPages, currentPage + range);

  return (
    <PaginationContainer>
      <PageButton onClick={handlePreviousPage} disabled={currentPage === 1}>
        &lt;
      </PageButton>

      {startPage > 1 && (
        <>
          <PageButton onClick={() => setPage(1)}>1</PageButton>
          {startPage > 2 && <Ellipsis>...</Ellipsis>}
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <PageButton
          key={startPage + index}
          onClick={() => setPage(startPage + index)}
          disabled={currentPage === startPage + index}
        >
          {startPage + index}
        </PageButton>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <Ellipsis>...</Ellipsis>}
          <PageButton onClick={() => setPage(totalPages)}>
            {totalPages}
          </PageButton>
        </>
      )}

      <PageButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        &gt;
      </PageButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 20px 0;
`;

const PageButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Ellipsis = styled.span`
  font-size: 16px;
  line-height: 24px;
`;

export default Pagination;
