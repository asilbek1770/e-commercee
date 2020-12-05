import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import Movieas from "./Movieas";
import { Pagination } from "./commons/Pagination";
import Genres from "./commons/Genres";
import { SearchBox } from "./commons/SearchBox";

export default class MoviesRouting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 3,
      currentPage: 1,
      currentGenre: "",
      sortColoumn: { path: "title", order: "asc" },
      searchQuery: "",
    };
  }

  handlerDelete = async (id) => {
    const originalPosts = this.state.movies;

    const movies = originalPosts.filter((m) => m._id !== id);
    this.setState({ movies });

    try {
      await deleteMovie(id);
      toast.success("Muvvofaqiyatli o`chirildi");
    } catch (e) {
      if (e.response && e.response.status === 404) {
        toast.error("bunday id li malumot oldin o`chirilgan!");
      } else if (e.response && e.response.status === 403) {
        toast.error("sizga bunday huquq berilmagan !");
      }
      this.setState({ movies: originalPosts });
    }
  };

  handlerLike = (id) => {
    let tempMovies = [...this.state.movies];
    tempMovies = tempMovies.map((item) => {
      if (item.id === id) return { ...item, isLike: !item.isLike };
      return item;
    });

    this.setState({ movies: [...tempMovies] });
  };

  handlerChangePage = (item) => {
    this.setState({ currentPage: item });
  };

  handlerSearch = (query) => {
    this.setState({ searchQuery: query, currentGenre: "", currentPage: 1 });
  };

  handlerSelectGenre = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handlerSort = (sortColoumn) => {
    this.setState({ sortColoumn });
  };

  async componentDidMount() {
    const { data } = await getGenres();
    let genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      currentGenre,
      sortColoumn,
      searchQuery,
    } = this.state;

    //filter code
    let filtered = allMovies;

    if (searchQuery !== "") {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (currentGenre && currentGenre._id) {
      filtered = allMovies.filter(
        (item) => item.genre._id === currentGenre._id
      );
    }

    //sort code
    filtered = _.orderBy(filtered, sortColoumn.path, sortColoumn.order);
    let pagenedMovies = paginate(filtered, currentPage, pageSize);

    return { totalCoun: filtered.length, data: pagenedMovies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortColoumn,
      searchQuery,
    } = this.state;
    const { length: count } = this.state.movies;

    if (count === 0) return <p>showing 0 movies in the database!</p>;

    const { totalCoun, data: movies } = this.getPageData();
    const { user } = this.props;

    return (
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-md-2">
            <Genres
              items={genres}
              currentGenre={currentGenre}
              onSelectGenre={this.handlerSelectGenre}
            />
          </div>
          <div className="col">
            {user && (
              <Link to="/movies/new" className="btn btn-primary mb-2">
                new Movie
              </Link>
            )}

            <p>showing {totalCoun} movies in the database!</p>
            <SearchBox
              searchQuery={searchQuery}
              onSearch={this.handlerSearch}
            />
            <Movieas
              movies={movies}
              onLike={this.handlerLike}
              onDelete={this.handlerDelete}
              onSort={this.handlerSort}
              sortColoumn={sortColoumn}
              user={user}
            />
            <Pagination
              currentPage={currentPage}
              itemsCount={totalCoun}
              pageSize={pageSize}
              onChangePage={this.handlerChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}
