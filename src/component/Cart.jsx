import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/Formatting";
import Button from "../UI/Button";
import Modal from "../UI/Modal.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalAmount = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.closeCart();
  }
  function handleCheckOut() {
    userProgressCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalAmount)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckOut}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
