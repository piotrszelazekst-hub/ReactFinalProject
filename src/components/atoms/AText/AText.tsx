import React from "react";


interface ATextProps {
    text: string;
    tag?: React.ElementType;
    className?: string;
}

const AText: React.FC<ATextProps> = ({ text, tag: Tag = "span", className }) => (
    <Tag className={className}>{text}</Tag>
)

export default AText