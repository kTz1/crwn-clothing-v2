import { FC } from "react";
import "./spinner.styles.scss";

export enum SPINNER_TYPES_CLASSES {
  spinner = "default",
  btnSpinner = "small",
}

const getSpinner = (spinnerType = SPINNER_TYPES_CLASSES.spinner) =>
  ({
    [SPINNER_TYPES_CLASSES.spinner]: "default",
    [SPINNER_TYPES_CLASSES.btnSpinner]: "small",
  }[spinnerType]);

export type SpinnerProps = {
  spinnerType?: SPINNER_TYPES_CLASSES;
  isLoading?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Spinner: FC<SpinnerProps> = ({
  spinnerType = SPINNER_TYPES_CLASSES.spinner,
  isLoading = false,
  children,
  ...otherProps
}) => {
  const CustomSpinner = getSpinner(spinnerType);
  return (
    <div className="spinner-overlay">
      <div className={`spinner-container ${CustomSpinner}`} {...otherProps}>
        {children}
      </div>
    </div>
  );
};

export default Spinner;
