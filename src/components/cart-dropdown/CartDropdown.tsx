import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../button/Button";
import CartItem from "../card-item/CartItem";
import { selectCartItems } from "../../store/cart/cart.selector";
import "./cart-dropdown.styles.scss";

const CardDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout");
  }, []);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CardDropdown;
