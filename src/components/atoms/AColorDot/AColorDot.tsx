import React from "react";
import classNames from "classnames";
import './AColorDot.scss'

type AColorDotSize = 'small' | 'medium' | 'large';

interface AColorDotProps {
  color: string;
  size?: AColorDotSize;
  className?: string;
}

const AColorDot: React.FC<AColorDotProps> = ({ color, size = "medium", className }) => {
  const AColorDotClasses = classNames(
    'a-color-dot',
    `a-color-dot--${size}`,
    className
  );

  return <div className={AColorDotClasses} style={{ backgroundColor: color }} />;
};

export default AColorDot;
