import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";

type InputType = 'text' | 'password' | 'email' | 'number';

interface AInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  isDisabled?: boolean;
  className?: string;
}

const AInput: React.FC<AInputProps> = ({
  type = "text",
  isDisabled = false,
  className = "",
  ...props
}) => {
  const inputClasses = classNames(
    'a-input',
    {
      'a-input--disabled': isDisabled,
      [`a-input--${type}`]: type !== 'text',
    },
    className
  );

  return (
    <input
      type={type}
      disabled={isDisabled}
      className={inputClasses}
      {...props}
    />
  );
};

export default AInput;
