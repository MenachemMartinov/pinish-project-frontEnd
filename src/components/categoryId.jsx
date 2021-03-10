import Card from "./card";

const CategoryId = ({ match: { params }, allCards, allCategories, id }) => {
  for (let category of allCategories) {
    if (category.categoryName === params.id) {
      const cardsPerCategory = allCards.filter(
        (card) => card.bizCategory === params.id
      );
      return cardsPerCategory?.map((card) => <Card key={card._id} card={card} id={id} />);
    }
  }
  return <h2>not found</h2>;
};

export default CategoryId;
