import { Link } from "react-router-dom";
import categoryService from "../common/services/categoryService";
import Card from "./card";

/***
 * the category component getting 4 parameter
 * 1 get the params.id
 * 2 get all cards
 * 3 get the all category
 * 4 get the user id
 */
const CategoryId = ({
  match: { params },
  allCards,
  allCategories,
  id,
  manager,
}) => {
  if (allCategories) {
    const category = allCategories.filter(
      (category) => category.categoryName === params.id
    );
    console.log(category);
    if (allCards) {
      const cardsPerCategory = allCards.filter(
        (card) => card.bizCategory === category[0].categoryName
      );
      console.log(cardsPerCategory);
      return (
        <>
          {manager && (
            <div>
              <Link
                className="btn btn-primary m-2"
                to={`/category/${category[0]._id}/edit`}
              >
                עריכת קטגוריה
              </Link>
              <button
                className="btn btn-danger m-2"
                onClick={() => categoryService.deleteCategories()}
              >
                מחיקת קטגוריה{" "}
              </button>
            </div>
          )}
          {cardsPerCategory?.map((card) => (
            <Card key={card._id} card={card} id={id} />
          ))}
        </>
      );
    }
  }

  return <h2>not found</h2>;
};

export default CategoryId;
