import React from "react";
import './ASelect.scss'
interface Option {
    value: string | number;
    label: string;
}

interface ASelectProps {
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    options: Option[];
    style?: React.CSSProperties;
}

const ASelect: React.FC<ASelectProps> = ({ value, onChange, options, style = {} }) => (
    <select value={value} onChange={onChange} className="a-select" style={style}>
        {options.map((o) => (
            <option key={o.value} value={o.value}>
                {o.label}
            </option>
        ))}
    </select>
);

export default ASelect;
