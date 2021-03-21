import React, { useState } from "react";
import { Link } from "react-router-dom";
import cardServices from "../common/services/cardsServices";
import "./card.css";
import { imgUrl } from "../common/config.json";
import favoritesService from "../common/services/favoritesService";

/***
 * the card component getting 2 parameters
 * 1 the card object
 * 2 the user id to check if the card has been created by the same user
 */
const Card = ({
  card: { _id, bizCategory, bizImageDefault, bizName, bizPhone, user_id },
  id,
}) => {
  /***
   * the state for favorites
   * this started with false
   */
  const [favoritesExist, setFavoritesExist] = useState(false);

  /***
   * the favorites function check if the card is favorite
   * if is true the favorites state changes to false
   * if is false the favorites state changes to true
   */
  const favorites = async () => {
    const exist = await favoritesService.ifExistFavorites(_id);
    if (exist.length > 0) {
      setFavoritesExist(true);
    } else {
      setFavoritesExist(false);
    }
  };
  /***
   * run the favorites function
   */
  favorites();

  /***
   * render the jsx
   */
  return (
    <div className="col-12 m-0 mt-4 p-0  ">
      <div className="container">
        <div className="row p-1 no-gutters text-center rounded  cardHeight cardBackground">
          <div className="col-12 col-md-5 col-lg-4 ">
            <img
              src={`${imgUrl}/${bizImageDefault[bizImageDefault.length - 1]}`}
              className="card-img inline cardImg"
              alt={`bizCategory: ${bizCategory}`}
            />
          </div>
          <div className="col-12 col-md-7 col-lg-8">
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
              <div className="col-12 "></div>
              <div className="col-12 col-md-6 col-lg-4 pt-4 ">
                <Link className="btn btn-primary btn-block" to={`/card/${_id}`}>
                  למידע נוסף לחץ כאן
                </Link>
              </div>
              {/** if this card created by the user wes logged*/}
              {user_id === id && (
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
              {/** if this card is not favorite*/}
              {id && !favoritesExist && (
                <button
                  className="btn btn-success btn-block m-3"
                  onClick={async () => {
                    const res = await favoritesService.newFavorites(_id);
                    if (res) {
                      setFavoritesExist(true);
                    }
                  }}
                >
                  הוספה למעודפים
                </button>
              )}
              {/** if this card is favorite*/}
              {id && favoritesExist && (
                <button
                  className="btn btn-success btn-block m-3"
                  onClick={async () => {
                    const res = await favoritesService.deleteFavorites(_id);
                    if (res) {
                      favorites();
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
};

export default Card;
