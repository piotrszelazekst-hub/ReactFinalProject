import React from 'react';
import './ACheckbox.scss'

interface ACheckboxProps {
  isChecked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ACheckbox: React.FC<ACheckboxProps> = ({ isChecked, onChange }) => (
  <input
    type="checkbox"
    checked={isChecked}
    onChange={onChange}
    className="a-checkbox"
  />
);

export default ACheckbox;
