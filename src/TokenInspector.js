import React, { PureComponent } from 'react';

import Highlighter from './Highlighter';

class TokenInspector extends PureComponent {
    render () {
        const { header, payload, signature } = this.props;
        return (
            <div className="jwt">
                <div className="jwt__section --half">
                    <h3 className="label">Header</h3>
                    <Highlighter object={header} />
                </div>

                <div className="jwt__section --half">
                    <h3 className="label">Payload</h3>
                    <Highlighter object={payload} />
                </div>

                <div className="jwt__section --full">
                    <h3 className="label">Signature</h3>
                    <code className="code">
                        <span className="token string">
                            {signature}
                        </span>
                    </code>
                </div>
            </div>
        );
    }
}

export default TokenInspector;