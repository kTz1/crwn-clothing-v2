import Button from "../button/Button";
import "./cart-dropdown.styles.scss";

const CardDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button type="submit">CHECKOUT</Button>
    </div>
  );
};

export default CardDropdown;
