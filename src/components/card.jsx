import React, { useState } from "react";
import { Link } from "react-router-dom";
import cardServices from "../common/services/cardsServices";
import "./card.css";
import { imgUrl } from "../common/config.json";
import favoritesService from "../common/services/favoritesService";

const Card = ({
  card: {
    _id,
    bizAddress,
    bizCategory,
    bizImageDefault,
    bizName,
    bizPhone,
    user_id,
  },
  id,
}) => {
  const [favoritesExist, setFavoritesExist] = useState(false);
  const favorites = async () => {
    const exist = await favoritesService.ifExistFavorites(_id);
    if (exist.length > 0) {
      setFavoritesExist(true);
    } else {
      setFavoritesExist(false);
    }
  };
  favorites();

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
