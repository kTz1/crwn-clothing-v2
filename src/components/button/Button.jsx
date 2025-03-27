/* eslint-disable react/prop-types */
import Spinner from "../spinner/Spinner";
import "./button.styles.scss";

const BUTTON_TYPES_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
  payNow: "pay-now",
};

const Button = ({
  children,
  buttonType,
  isLoading,
  spinnerType = "btnSpinner",
  ...otherProps
}) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]} `}
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? <Spinner spinnerType={spinnerType} /> : children}
    </button>
  );
};

export default Button;
