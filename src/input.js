import React from "react";


const Input = ({
  label,
  hint,
  password = false,
  controller,
  validator,
  keyboardType,
  textInputAction,
  focusNode,
  nextFocus,
  autofocus = false,
  onClickIcon,
  errorText = false,
}) => {
  const handleChange = (event) => {
    controller(event.target.value);
  };

  return (
    <div className="input-container">
      <label htmlFor="input">{label}</label>

      
      <input
        type={password ? "password" : "text"}
        id="input"
        value={controller} 
        onChange={handleChange} 
        onFocus={focusNode}
        autoFocus={autofocus}
        className={`input-field ${errorText ? "error" : ""}`}
        placeholder={hint}
        onKeyDown={(e) => {
          if (e.key === "Enter" && nextFocus) {
            nextFocus(); 
          }
        }}
        style={{ paddingRight: onClickIcon ? "30px" : "10px" }}
      />

    
      {onClickIcon && (
        <span className="input-icon" onClick={onClickIcon}>
          &#x1F50D; 
        </span>
      )}

      
      {errorText && <p className="error-message">{errorText}</p>}
    </div>
  );
};

export default Input;
