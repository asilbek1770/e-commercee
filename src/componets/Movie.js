import React from "react";
import Joi from "joi-browser";
import Form from "./commons/Form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

export default class Movie extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().min(5).label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().label("Stock number"),
    dailyRentalRate: Joi.number().required().min(1).max(10).label("Rate"),
  };

  doSumbit = async () => {
    await saveMovie(this.state.data);
    this.props.history.replace("/movies");
  };

  populationGenre = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populationMovie = async () => {
    try {
      let movieId = this.props.match.params.id;
      if (movieId === "new") return;

      let { data: movie } = await getMovie(movieId);
      this.setState({ data: this.viewModel(movie) });
    } catch (e) {
      if (e.response && e.response.status === 404)
        this.props.history.replace("/movies");
    }
  };

  async componentDidMount() {
    await this.populationGenre();
    await this.populationMovie();
  }

  viewModel = (movie) => {
    return {
      _id: "" + movie._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genre._id ?? movie.genre._id,
    };
  };

  render() {
    return (
      <div className="m-4">
        <h1>Movie from </h1>
        <form onSubmit={this.handlerSubmit}>
          {this.rendringInput("title", "Title")}
          {this.rendringSelect("genreId", "Genre")}
          {this.rendringInput("numberInStock", "Number in Stock", "number")}
          {this.rendringInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}
