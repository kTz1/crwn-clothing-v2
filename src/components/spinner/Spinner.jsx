import PropTypes from "prop-types";
import "./spinner.styles.scss";

const SPINNER_TYPES_CLASSES = {
  spinner: "default",
  btnSpinner: "small",
};
const Spinner = ({ spinnerType = "spinner", ...otherProps }) => (
  <div className="spinner-overlay">
    <div
      className={`spinner-container ${SPINNER_TYPES_CLASSES[spinnerType]}`}
      {...otherProps}
    ></div>
  </div>
);

Spinner.propTypes = {
  spinnerType: PropTypes.oneOf(Object.keys(SPINNER_TYPES_CLASSES)),
};

export default Spinner;
