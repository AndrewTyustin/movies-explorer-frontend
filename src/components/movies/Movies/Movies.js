import React from "react";
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import moviesApi from "../../../utils/MoviesApi";
import searchMovies from "../../../utils/searchMovies";
import SearchResults from "../SearchResults/SearchResults";
import formatMovies from "../../../utils/formatMovies";

function Movies({ savedMovies, onAddSavedMovie, onDeleteSavedMovie }) {
  const [allMovies, setAllMovies] = React.useState(null);

  const defaultSearchText = localStorage.getItem("searchText") ?? "";
  const defaultAreShortiesSeleted =
    JSON.parse(localStorage.getItem("areShortiesSeleted")) ?? false;
  const defaultFoundMovies =
    JSON.parse(localStorage.getItem("foundMovies")) ?? [];

  const [searchText, setSearchText] = React.useState(defaultSearchText);
  const [areShortiesSeleted, setAreShortiesSeleted] = React.useState(
    defaultAreShortiesSeleted
  );
  const [foundMovies, setFoundMovies] = React.useState(defaultFoundMovies);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorOnLoading, setIsErrorOnLoading] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("areShortiesSeleted", areShortiesSeleted);
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
  }, [searchText, areShortiesSeleted, foundMovies]);

  React.useEffect(() => {
    if (allMovies) {
      const foundMovies = searchMovies(
        allMovies,
        searchText,
        areShortiesSeleted
      );
      setFoundMovies(foundMovies);
    }
  }, [searchText, areShortiesSeleted, allMovies]);

  async function getMovies() {
    setIsErrorOnLoading(false);
    setIsLoading(true);
    try {
      let movies = await moviesApi.getMovies();

      movies = movies.map(formatMovies);
      setAllMovies(movies);
    } catch {
      setIsErrorOnLoading(true);
    }
    setIsLoading(false);
  }

  function handleSearchFormSubmit({ searchText, areShortiesSeleted }) {
    setAreShortiesSeleted(areShortiesSeleted);
    setSearchText(searchText);
    if (!allMovies) getMovies();
  }

  function handleCheckboxChange(value) {
    setAreShortiesSeleted(value);
    if (!allMovies) getMovies();
  }

  async function handleCardClick(movie) {
    const isSaved = savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
    if (isSaved) {
      const savedMovie = savedMovies.find(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
      await onDeleteSavedMovie(savedMovie);
    } else {
      await onAddSavedMovie(movie);
    }
  }

  return (
    <>
      <Header />
      <main aria-label="Поиск фильмов">
        <SearchForm
          onSubmit={handleSearchFormSubmit}
          onCheckboxChange={handleCheckboxChange}
          isBlocked={isLoading}
          defaultSearchText={searchText}
          defaultAreShortiesSeleted={areShortiesSeleted}
        />

        {searchText && (
          <SearchResults
            isErrorOnLoading={isErrorOnLoading}
            isLoading={isLoading}
            movies={foundMovies}
            savedMovies={savedMovies}
            onCardClick={handleCardClick}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
