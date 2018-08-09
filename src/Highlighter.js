import React from 'react';
import moment from 'moment';

const renderVal = val => {
    switch (typeof val) {
        case 'string':
            return <span className="token string">"{val}"</span>;

        case 'number':
            return <span className="token number">{val}</span>;

        case 'boolean':
            return <span className="token boolean">{val ? 'true' : 'false'}</span>;

        default:
            return <span>{val}</span>
    }
};

const renderTimestamp = val => {
    if (typeof val !== 'number') return null;

    const timestamp = moment.unix(val);
    const isRightLength = val.toString().length === 10;

    return isRightLength && timestamp.isValid() ? (
        <span className="token timestamp"> ({timestamp.format('YYYY-MM-DD HH:mm:ss')})</span>
    ) : null;
};

const renderObj = (object, root = true) => {
    const items = Object.entries(object).map(([prop, val], i, arr) => {
        const isObj = typeof val === 'object';
        return (
            <pre key={prop}>
                <span className="token property">"{prop}"</span>
                <span className="token operator">: {isObj && '{'}</span>
                {isObj ? renderObj(val, false) : renderVal(val)}
                <span className="token operator">
                    {isObj && '}'}
                    {i !== arr.length - 1 && ','}
                </span>
                {renderTimestamp(val)}
            </pre>
        );
    });

    if (root) {
        return (
            <pre>
                <span className="token operator">{'{'}</span>
                {items}
                <span className="token operator">{'}'}</span>
            </pre>
        );
    }

    return items;
}

const Highlighter2 = ({ object }) => (
    <code className="code">
        {renderObj(object)}
    </code>
);

export default Highlighter2;
