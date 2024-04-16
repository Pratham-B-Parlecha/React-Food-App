import { useContext } from "react";
import Button from "../UI/Button.jsx";
import imgLogo from "../assets/logo.jpg";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);
  const totalCartAmount = cartCtx.items.reduce((total, item) => total + item.quantity , 0);
  function handleShowModal() {
    progressCtx.showCart()
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={imgLogo} alt="A restaurant" />
        <h2>ReactFood</h2>
      </div>
      <nav>
        <Button textOnly onClick={handleShowModal}>Cart ({totalCartAmount})</Button>
      </nav>
    </header>
  );
}
