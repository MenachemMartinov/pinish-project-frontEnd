import React, { useState } from "react";
import { Link } from "react-router-dom";

/***
 * the "navBar" component getting 3 parameters
 * 1 the user info and
 * 2 all categories
 * 3 the cards to can search
 */
const NavBar = ({ user, categories, cards }) => {
  /***
   * the state for the "filterCards" function
   * is started with null
   */
  const [state, setState] = useState(null);
  /***
   * the function getting 1 parameter "Search"
   * the function search end filter the all cards 
   */
  const filterCards = (Search) => {
    if (cards) {
      if (Search.length > 0) {
        let filterOfSearch = Search.split(" ");

        const cardsFind = cards.filter((card) =>
          filterOfSearch.some((item) =>
            card.bizName.toLowerCase().includes(item)
          )
        );
        setState(cardsFind);
      } else {
        setState(null);
      }
    }
  };

  
  /**
   * the render jsx of the component
   */
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <div className="container">
          <Link to="/" className="navbar-brand">
            אינדקס העסקים ביתר עילית
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarManager"
            aria-controls="navbarManager"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarManager">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="dropdown01"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  תפריט ניוט באתר
                </Link>
                <div className="dropdown-menu" aria-labelledby="dropdown01">
                  {categories?.length > 0 &&
                    categories.map((item) => {
                      return (
                        <Link
                          key={item._id}
                          className="dropdown-item"
                          to={`/category/${item.categoryName}`}
                        >
                          {item.categoryName}
                        </Link>
                      );
                    })}
                  {/** if user is not logged*/}
                  {!user && (
                    <>
                      <Link className="dropdown-item" to="/login">
                        התחברות
                      </Link>
                      <Link className="dropdown-item" to="/sign-up-business">
                        הרשמה לבעלי עסקים
                      </Link>
                      <Link className="dropdown-item" to="/sign-up-user">
                        הרשמה ללקוחות
                      </Link>
                      <Link className="dropdown-item" to="/sign-up-manager">
                        הרשמה למנהלים
                      </Link>
                    </>
                  )}
                  {/** if user is logged*/}
                  {user && (
                    <>
                      <Link className="dropdown-item" to="/logout">
                        התנתקות
                      </Link>
                      <Link className="dropdown-item" to="/myFavorite">
                        המעודפים שלי
                      </Link>
                    </>
                  )}
                </div>
              </li>
            </ul>
            <form>
              <input
                type="search"
                name="searchCard"
                id="searchCard"
                className="form-control"
                placeholder="חיפוש לפי שם העסק"
                onChange={({ target: { value } }) => filterCards(value)}
                
              />
            </form>
            {state?.length > 0 && (
              <div className="dropdown-menu show ml-5">
                {state.map((item) => (
                  <Link
                    key={item._id}
                    className=" btn btn-md btn-block "
                    onClick={() => setState(null)}
                    to={`/card/${item._id}`}
                  >
                    {item.bizName}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
