import React from 'react';

import './custom-button.scss';

const CustomButton = ({children, clear, inverted, ...otherProps}) => (
    <button
        className={`
        ${inverted ? 'inverted' : ''}
         ${clear ? 'clearBtn' : ''} custom-button`}
        {...otherProps}>
        {children}
    </button>
)

export default CustomButton;

