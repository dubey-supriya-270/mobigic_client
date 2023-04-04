import React from "react";
import "../styles/text-field.css";

//Props interface. Defines all the required props by the component
interface Props {
  value: string | number | readonly string[] | undefined; //value of the input field
  placeholder: string; //placeholder text
  textFieldStyle?: object; //additional styles object
  name?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; //onChange event handler
  label: string; //Label Text
  type?: string; //Type of input field. By default, text
  id: string; //Id of the input field. Would be postfixed with _element
  error?: string; //Error message for a text field (optional)
}

//Common TextField Component
export const TextField: React.FC<Props> = ({
  label,
  placeholder,
  name,
  handleChange,
  type,
  id,
  textFieldStyle,
  value,

  error,
}) => {
  return (
    <div className="main-container">
      <div className="label-div">
        <label className="label" htmlFor={id + "_element"}>
          {label}
        </label>
      </div>
      <div
        // based on fields like disabled error and warning change the class names to present different
        //  styles to the user
        className="text-field-container"
      >
        <input
          value={value}
          id={id + "_element"}
          placeholder={placeholder}
          type={type ? type : "text"}
          className={"input-text-field"}
          name={name}
          // if there is a style prop then use the incoming styles
          style={textFieldStyle ? textFieldStyle : {}}
          onChange={handleChange}
        />
      </div>
      {/* Display the error message if any */}
      {error ? (
        <span
          className={"input-error-message"}
          id={"error-message" + id}
          key={error}
        >
          {error}
        </span>
      ) : null}
    </div>
  );
};
