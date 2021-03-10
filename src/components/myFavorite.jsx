import React, { Component } from "react";
import cardServices from "../common/services/cardsServices";
import favoritesService from "../common/services/favoritesService";
import Card from "./card";

class MyFavorite extends Component {
  state = {
    favorites: [],
  };

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
