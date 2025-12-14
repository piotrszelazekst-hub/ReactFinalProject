import React from 'react';
import './MListItem.scss';
import { capitalize } from '@utils/general';
import ACheckbox from '@atoms/ACheckbox/ACheckbox';
import AText from '@atoms/AText/AText';
import classNames from 'classnames';
import Select from '@atoms/ASelect/ASelect'
import AButton from '@atoms/AButton/AButton';

interface MListItemProps {
    text: string;
    isCompleted?: boolean;
    selectedItem?: string;
    onCompletedChange?: React.ChangeEventHandler<HTMLInputElement>;
    onItemChange: React.ChangeEventHandler<HTMLSelectElement>;
    onDelete?: () => void;
    availableItems: string[];
    shouldShowCheckbox?: boolean;
    shouldShowActionButton?: boolean;
}

const MListItem: React.FC<MListItemProps> = ({
    text,
    isCompleted = false,
    selectedItem = '',
    onCompletedChange,
    onItemChange,
    onDelete,
    availableItems,
    shouldShowCheckbox = false,
    shouldShowActionButton = false,
}) => {
    // Np. availableItems = ['green', 'blue']
    // itemOptions = [{value: '', label: ''}, [{value: 'green', label: 'Green'}, {value: 'blue', label: 'Blue'}]]

    const itemOptions = [
        { value: '', label: '' },
        ...availableItems.map((item) => ({
            value: item,
            label: capitalize(item),
        })),
    ];

    const textClasses = classNames('m-list-item__text', {
        'm-list-item__text--completed': isCompleted,
    });

    return (
        <li className="m-list-item">
            <div className="m-list-item__content">
                <div className="m-list-item__segment m-list-item__segment--label">
                    {shouldShowCheckbox && <ACheckbox isChecked={isCompleted} onChange={onCompletedChange} />}
                    <AText text={text} className={textClasses} />
                </div>
                <div className="m-list-item__segment m-list-item__segment--actions">
                    {!!availableItems.length && (
                        <Select value={selectedItem} options={itemOptions} onChange={onItemChange} />
                    )}
                    {shouldShowActionButton && (
                        <AButton className="m-list-item__segment-remove" onClick={onDelete}>Remove</AButton>
                    )}
                </div>
            </div>
        </li>
    );
};


export default MListItem;