import React, { Component } from "react";
import cardServices from "../common/services/cardsServices";
import favoritesService from "../common/services/favoritesService";
import Card from "./card";

/***
 * "myFavorite" component
 * this component shows the favorites card
 */
class MyFavorite extends Component {
  /***
   * the state of the component
   */
  state = {
    favorites: [],
  };

  /***
   * the function send to the server request to get all favorites cards
   * if is exist favorites card will send new request of every single card end add to the state
   */
  async componentDidMount() {
    const myFavorite = await favoritesService.getAllFavorites();
    const favorites = [];
    if (myFavorite) {
      for (const favorite of myFavorite) {
        const data = await cardServices.getCard(favorite.of_card);
        favorites.push(data);
      }
      this.setState({ favorites: favorites });
    }
  }

  /**
   * the render jsx of the component
   */
  render() {
    const { favorites } = this.state;
    return (
      <>
        {favorites &&
          favorites.map((favoriteCard) => (
            <Card
              key={favoriteCard._id}
              card={favoriteCard}
              id={this.props.id}
            />
          ))}
      </>
    );
  }
}

export default MyFavorite;
