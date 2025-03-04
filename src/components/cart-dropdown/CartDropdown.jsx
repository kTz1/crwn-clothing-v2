import { useContext } from "react";
import { useNavigate } from "react-router";
import Button from "../button/Button";
import CartItem from "../card-item/CartItem";
import { CartContext } from "../../contexts/cart.context";
import "./cart-dropdown.styles.scss";

const CardDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CardDropdown;
