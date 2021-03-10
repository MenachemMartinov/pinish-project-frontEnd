import React, { Component } from "react";
import { Link } from "react-router-dom";
import cardServices from "../common/services/cardsServices";
import favoritesService from "../common/services/favoritesService";
import { imgUrl } from "../common/config.json";

import "./card.css";

class CardId extends Component {
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
    rode: false,
  };
  favorites = async () => {
    const exist = await favoritesService.ifExistFavorites(this.state.card._id);
    if (exist.length > 0) {
      this.setState({ rode: true });
    } else {
      this.setState({ rode: false });
    }
  };
  componentDidMount = async () => {
    const data = await cardServices.getCard(this.props.match.params.id);
    this.setState({
      card: data,
    });
    this.favorites();
  };
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
                    src={`${imgUrl}/${bizImageDefault[bizImageDefault.length - 1]}`}
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
                    קטגוריה: {bizCategory}
                  </Link>
                </div>
                <div className="col-12 text-center pt-4 p-1 cardLinks">
                  <p className=" bg-primary m-3">
                    מידע נוסף על העסק:
                    <br /> {bizDescription}
                  </p>
                </div>
                <div className="col-12 "></div>
                {user_id === this.props.id && (
                  <>
                    <div className="col-12 "></div>
                    <div className="col-6 pt-4">
                      <Link
                        className="btn btn-dark btn-sm"
                        to={`/card/${_id}/edit`}
                      >
                        עריכת כרטיס
                      </Link>
                    </div>
                    <div className="col-6 pt-4 ">
                      <Link
                        className="btn btn-danger btn-sm"
                        onClick={() => cardServices.deleteCard(_id)}
                        to="/"
                      >
                        מחיקת כרטיס
                      </Link>
                    </div>
                  </>
                )}
                {this.props.id && !this.state.rode && (
                  <button
                    className="btn btn-success btn-block m-3"
                    onClick={async () => {
                      const res = await favoritesService.newFavorites(_id);
                      if (res) {
                        this.setState({ rode: true });
                      }
                    }}
                  >
                    הוספה למעודפים
                  </button>
                )}
                {this.props.id && this.state.rode && (
                  <button
                    className="btn btn-success btn-block m-3"
                    onClick={async () => {
                      const res = await favoritesService.deleteFavorites(_id);
                      if (res) {
                        this.favorites();
                      }
                    }}
                  >
                    הסרה מהמעודפים
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
