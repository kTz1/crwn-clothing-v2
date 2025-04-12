/* eslint-disable react/prop-types */
import { FC, ButtonHTMLAttributes } from "react";
import Spinner from "../spinner/Spinner";
import "./button.styles.scss";

export enum BUTTON_TYPES_CLASSES {
  google = "google-sign-in",
  inverted = "inverted",
  payNow = "pay-now",
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.inverted) =>
  ({
    [BUTTON_TYPES_CLASSES.google]: "google-sign-in",
    [BUTTON_TYPES_CLASSES.inverted]: "inverted",
    [BUTTON_TYPES_CLASSES.payNow]: "pay-now",
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPES_CLASSES;
  isLoading?: boolean;
  spinnerType?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  spinnerType = "btnSpinner",
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <button
      className={`button-container ${CustomButton} `}
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? <Spinner spinnerType={spinnerType} /> : children}
    </button>
  );
};

export default Button;
