import React from "react";
import "../styles/button.css";

//Props interface. Defines all the required props by the component
interface Props {
  value: string; //Text on the button
  styles?: object; //additional styles object
  handleClick?: any; //Onclick event handler of the button element
  id: string; //Id of the input field. Would be postfixed with _element
  secondaryClassName?:
    | "button-outline"
    | "button-danger"
    | "button-danger-outline"
    | "button-success"
    | "button-success-outline"
    | "button-warn"
    | "button-warn-outline"
    | "button-disabled"
    | "complaint-button-enabled"
    | "button-cancel"
    | ""; // Additional CSS classes for the component
  disabledButton?: boolean | false; //props to disable button ot not default(false)
}

// Common Button Component
export const Button: React.FC<Props> = ({
  handleClick,
  value,
  id,
  secondaryClassName,
  styles,
  disabledButton,
}) => {
  return (
    <button
      id={id + "_element"}
      className={`button ${secondaryClassName || ""}`}
      style={styles ? styles : {}}
      onClick={handleClick ? handleClick : null}
      disabled={disabledButton}
    >
      {value}
    </button>
  );
};
