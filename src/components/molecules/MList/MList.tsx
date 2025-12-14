import React from "react";

interface MListProps {
    items: React.ReactNode[];
}

const MList: React.FC<MListProps> = ({ items }) => (
    <ul className="m-list">{items}</ul>
);

export default MList;
