import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

type MovieDetailsProps = {
  movie: {
    title: string;
    overview: string;
    poster_path: string;
  };
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={500}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`,
  );
  const movie = await res.json();

  return { props: { movie } };
};

export default MovieDetails;
