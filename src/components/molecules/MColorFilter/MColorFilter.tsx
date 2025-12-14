import React from "react";
import "./MColorFilter.scss";
import MSection from "@molecules/MSection/MSection";
import ACheckbox from "@atoms/ACheckbox/ACheckbox";
import AColorDot from "@atoms/AColorDot/AColorDot";
import { capitalize } from "@utils/general";
import AText from "@atoms/AText/AText";


type ColorChangeActionType = "added" | "removed";

interface MColorFitlerProps {
    availableColors: string[];
    selectedColors: string[];
    onColorChange: (
        color: string,
        action: ColorChangeActionType,
    ) => void;
}

const MColorFitler: React.FC<MColorFitlerProps> = ({
    availableColors,
    selectedColors,
    onColorChange,

}) => {
    const handleColorChange = (color: string, isChecked: boolean) => {
        const actionType: ColorChangeActionType = isChecked ? 'removed' : 'added';
        onColorChange(color, actionType);

    };
    const renderedColors = availableColors.map((color) => {
        const isChecked = selectedColors.includes(color);



        return (
            <div key={color} className="m-color-filter__item">
                <ACheckbox isChecked={isChecked} onChange={() => handleColorChange(color, isChecked)}></ACheckbox>
                <AColorDot className='color-filter__dot' color={color} size="small" />
                <AText text={capitalize(color)} />
            </div>
        );
    });

    return (
        <MSection title="Filter by color">
            <div className="m-color-filter">{renderedColors}</div>
        </MSection>
    );
};

export default MColorFitler;

