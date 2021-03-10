import { Link } from "react-router-dom";
// import { imgUrl } from "../common/config.json";

import "./category.css";

const Category = ({ allCategories }) => {
  return (
    <div className="row m-0 p-0 pt-4 pb-3">
      {allCategories?.length > 0 &&
        allCategories.map((category) => {
          return (
            <div
              key={category.categoryName}
              className="col-12 col-md-6 col-lg-4 pt-4"
            >
              <div className="container ">
                <div className="row justify-content-md-center">
                  <div className="col-12 alignItemsCenter">
                    <img
                      className="cord-img-top inline cardImg "
                      src={category.image}
                      alt={`category-${category.categoryName}`}
                    />
                  </div>
                  <div className="col-12">
                    <Link
                      to={`/category/${category.categoryName}`}
                      className="btn btn-primary btn-block btn-lg"
                    >
                      {category.categoryName}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Category;