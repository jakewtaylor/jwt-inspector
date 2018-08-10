import React from 'react';

const Icon = ({ name, className = '', ...rest }) => (
    <i className={`material-icons ${className}`} {...rest}>{name}</i>
);

export default Icon;
