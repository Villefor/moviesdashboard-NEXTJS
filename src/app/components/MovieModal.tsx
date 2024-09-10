import React from 'react';
import styled from 'styled-components';
import { MovieTypes } from '../types';

interface MovieModalProps {
  movie: MovieTypes | null;
  modalOpen: boolean;
  onClose: () => void;
}

const MovieModal = ({ movie, modalOpen, onClose }: MovieModalProps) => {
  if (!movie) return null;

  return (
    <ModalOverlay modalOpen={modalOpen} onClick={onClose}>
      <ModalContent modalOpen={modalOpen} onClick={(e) => e.stopPropagation()}>
        <Detail>
          <strong>Avaliação:</strong> {movie.vote_average}
        </Detail>
        <Detail>
          <strong>Sinopse:</strong> {movie.overview}
        </Detail>
        <Detail>
          <strong>Idioma nativo:</strong> {movie.original_language}
        </Detail>
        <Detail>
          <strong>Generos:</strong> {movie.genre_ids.join(', ')}
        </Detail>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div<{ modalOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${({ modalOpen }) => (modalOpen ? '1' : '0')};
  visibility: ${({ modalOpen }) => (modalOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContent = styled.div<{ modalOpen: boolean }>`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  position: relative;
  transform: ${({ modalOpen }) => (modalOpen ? 'translateY(0)' : 'translateY(-50px)')};
  opacity: ${({ modalOpen }) => (modalOpen ? '1' : '0')};
  transition: all 0.3s ease;
`;

const Detail = styled.p`
  margin-bottom: 2%; /* Add space between details */
`;

const CloseButton = styled.button`
  background-color: #ff6347;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

export default MovieModal;
