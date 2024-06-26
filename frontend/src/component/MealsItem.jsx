import { useContext } from "react";
import Button from "../UI/Button.jsx";
import { currencyFormatter } from "../util/Formatting.js";
import CartContext from "../store/CartContext.jsx";

export default function MealsItem({ meal }) {
  const cartCtx = useContext(CartContext);
  function handleAddItem() {
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img
          src={`https://react-food-app-bakend.vercel.app/${meal.image}`}
          aria-colcount={meal.name}
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItem}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}