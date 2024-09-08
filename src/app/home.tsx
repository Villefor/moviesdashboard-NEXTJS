import { useState } from "react";
import MoviesList from "../components/MoviesList";
import Bar from "../components/SearchField";

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div>
      <Bar query={query} setQuery={setQuery} />
      <MoviesList query={query} />
    </div>
  );
};

export default Home;
