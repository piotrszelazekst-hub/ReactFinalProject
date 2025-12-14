import React from 'react';
import classNames from 'classnames';
import './AButton.scss'

type AButtonType = 'primaty' | 'secondary'

interface AButtonProps {
    onClick?: React.MouseEventHandler;
    children: React.ReactNode;
    isDisabled?: boolean;
    isLoading?: boolean;
    className?: string;
    style?: React.CSSProperties;
    type?: AButtonType;
}

const AButton: React.FC<AButtonProps> = ({
    onClick,
    children,
    isDisabled = false,
    isLoading = false,
    className = '',
    style = {},
    type = 'primary'
}) => {
    const buttonClasses = classNames(
        'a-button',
        { 'a-button--disabled': isDisabled || isLoading },
        { 'a-button--primary': type === 'primary' },
        { 'a-button--secondary': type === 'secondary' },
        className
    );

    return (
        <button onClick={onClick} disabled={isLoading || isDisabled} className={buttonClasses} style={style}>
            {isLoading ? <span className="a-button__loader" /> : children}
        </button>
    )
}

export default AButton