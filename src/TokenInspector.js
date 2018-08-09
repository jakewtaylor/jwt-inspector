import React, { PureComponent } from 'react';

import TokenSplitter from './TokenSplitter';
import Highlighter from './Highlighter';

class TokenInspector extends PureComponent {
    render () {
        const { token } = this.props;
        return (
            <TokenSplitter token={token}>
                {(header, payload, signature) => (
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
                )}
            </TokenSplitter>
        );
    }
}

export default TokenInspector;