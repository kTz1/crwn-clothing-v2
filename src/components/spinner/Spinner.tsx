import "./spinner.styles.scss";

const SPINNER_TYPES_CLASSES = {
  spinner: "default",
  btnSpinner: "small",
} as const;

type SpinnerType = keyof typeof SPINNER_TYPES_CLASSES;

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  spinnerType?: SpinnerType;
}

const Spinner: React.FC<SpinnerProps> = ({
  spinnerType = "spinner",
  ...otherProps
}) => (
  <div className="spinner-overlay">
    <div
      className={`spinner-container ${SPINNER_TYPES_CLASSES[spinnerType]}`}
      {...otherProps}
    ></div>
  </div>
);

export default Spinner;
