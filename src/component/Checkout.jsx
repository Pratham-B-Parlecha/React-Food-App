import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/Formatting.js";
import Input from "../UI/Input.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "../UI/Button.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );
  const totalAmount = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  function handleClose() {
    userProgressCtx.closeCheckout();
  }
  function handleClearCart() {
    userProgressCtx.closeCheckout();
    cartCtx.clearCart();
    clearData();
  }
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isLoading) {
    actions = <span>Sending the request</span>
  }
  if(data && !error){
    return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
        <h2>Success!</h2>
        <p>Your Order was Submitted Successfully.</p>
        <p>We will get back to you with more details via email within a minutes</p>
        <p className="modal-actions">
            <Button onClick={handleClearCart}>Okay</Button>
        </p>
    </Modal>
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title="Failed to Submit" message={error}/>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
