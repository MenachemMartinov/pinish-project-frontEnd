import React, { Component } from "react";
import { Link } from "react-router-dom";
import cardServices from "../common/services/cardsServices";
import favoritesService from "../common/services/favoritesService";
import { imgUrl } from "../common/config.json";

import "./card.css";

/***
 * cardId component
 */
class CardId extends Component {
  /***
   * the state of the "cardId"
   */

  state = {
    card: {
      _id: "",
      bizAddress: "",
      bizCategory: "",
      bizDescription: "",
      bizImage: [],
      bizImageDefault: "",
      bizImageWeek: "",
      bizName: "",
      bizPhone: "",
    },
    favoriteIsExist: false,
  };

  /***
   * the favorites function check if the card is favorite
   * if is true the favorites state changes to false
   * if is false the favorites state changes to true
   */
  favorites = async () => {
    const exist = await favoritesService.ifExistFavorites(this.state.card._id);
    if (exist.length > 0) {
      this.setState({ favoriteIsExist: true });
    } else {
      this.setState({ favoriteIsExist: false });
    }
  };

  /***
   * the function run after started the component
   * the function run the function to get the exact card by id end the function run the "favorites" function
   */
  componentDidMount = async () => {
    const data = await cardServices.getCard(this.props.match.params.id);
    this.setState({
      card: data,
    });
    this.favorites();
  };

  /***
   * render the jsx
   */
  render() {
    const {
      _id,
      bizCategory,
      bizDescription,
      bizImageDefault,
      bizImageWeek,
      bizName,
      bizPhone,
      user_id,
    } = this.state.card;
    return (
      <div className="col-12 m-0 mt-4 p-0 ">
        <div className="container">
          <div className="row p-1 no-gutters text-center rounded cardHeight cardBackground">
            <div className="col-12 ">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <img
                    src={`${imgUrl}/${
                      bizImageDefault[bizImageDefault.length - 1]
                    }`}
                    className="card-img inline cardImg"
                    alt={`bizImageDefault of:${bizName} of: ${bizCategory}`}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <img
                    src={`${imgUrl}/${bizImageWeek[bizImageWeek.length - 1]}`}
                    className="card-img inline cardImg"
                    alt={`bizImageWeek of:${bizName} of: ${bizCategory}`}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 ">
              <div className="row justify-content-md-center p-2">
                <div className="col-12 ">
                  <h4>{bizName}</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-4 cardLinks">
                  <a
                    href={`tel:${bizPhone}`}
                    className="btn btn-success btn-block"
                  >
                    {bizPhone}
                  </a>
                </div>
                <div className="col-12 col-md-6 col-lg-4 cardLinks">
                  <Link
                    className="btn btn-dark btn-block"
                    to={`/category/${bizCategory}`}
                  >
                    ??????????????: {bizCategory}
                  </Link>
                </div>
                <div className="col-12 text-center pt-4 p-1 cardLinks">
                  <p className=" bg-primary m-3">
                    ???????? ???????? ???? ????????:
                    <br /> {bizDescription}
                  </p>
                </div>
                <div className="col-12 "></div>
                {/** if this card created by the user wes logged*/}
                {user_id === this.props.id && (
                  <>
                    <div className="col-12 "></div>
                    <div className="col-6 pt-4">
                      <Link
                        className="btn btn-dark btn-sm"
                        to={`/card/${_id}/edit`}
                      >
                        ?????????? ??????????
                      </Link>
                    </div>
                    <div className="col-6 pt-4 ">
                      <Link
                        className="btn btn-danger btn-sm"
                        onClick={() => cardServices.deleteCard(_id)}
                        to="/"
                      >
                        ?????????? ??????????
                      </Link>
                    </div>
                  </>
                )}
                {/** if this card is not favorite*/}
                {this.props.id && !this.state.favoriteIsExist && (
                  <button
                    className="btn btn-success btn-block m-3"
                    onClick={async () => {
                      const res = await favoritesService.newFavorites(_id);
                      if (res) {
                        this.setState({ favoriteIsExist: true });
                      }
                    }}
                  >
                    ?????????? ????????????????
                  </button>
                )}
                {/** if this card is favorite*/}
                {this.props.id && this.state.favoriteIsExist && (
                  <button
                    className="btn btn-success btn-block m-3"
                    onClick={async () => {
                      const res = await favoritesService.deleteFavorites(_id);
                      if (res) {
                        this.favorites();
                      }
                    }}
                  >
                    ???????? ??????????????????
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardId;
