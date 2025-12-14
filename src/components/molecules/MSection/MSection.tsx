import { ReactNode } from "react";
import './MSection.scss'
import React from 'react'
import AText from '@atoms/AText/AText'

interface MSectionProps {
    title: string;
    children: ReactNode;
    style?: React.CSSProperties
}


const MSection: React.FC<MSectionProps> = ({ title, children, style = {} }) => {
    return <div className="n-section" style={style} >
        <AText tag="h5" text={title} className="m-section__title m-section__title--highlighted" />
        {children}
    </div>;
};

export default MSection

/*
BEM - Block / Element / Modifer

Wzór: block__element--modifer

Np. n-section <-- block
m-section_title <-- element (nalezy do danego bloku)
m-section--highlighted <-- modyfikaor (modyfikator elementu n-section__title)

ANTI-PATTERNS IN PRACTISE

1. Blok z dwoma elemenatami -> n-section__title__content <-- elementy title i content <- zle
2. element z dwoma modyfiaktorami -> m-section--highlighted--disabled <-- m-section--highlighted m-section--disabled


*/