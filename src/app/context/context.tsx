import React, { createContext, useState, ReactNode } from "react";

interface MovieContextProps {
  session: string | null;
  setSession: (session: string | null) => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<string | null>(null);

  return (
    <MovieContext.Provider value={{ session, setSession }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
