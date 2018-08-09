import React, { Component } from 'react';

import { matchesToken } from './helpers/matchesToken';

import TokenInspector from './TokenInspector';

class App extends Component {
    state = {
        jwt: '',
    }

    handleJwtChange = (e) => {
        const jwt = e.target.value;
        this.setState({ jwt });
    }

    render () {
        const { jwt } = this.state;

        return (
            <div className="page">
                <div className="jwt_field__container">
                    <input
                        className="jwt_field"
                        value={jwt}
                        onChange={this.handleJwtChange}
                    />
                </div>

                {matchesToken(jwt) && (
                    <TokenInspector token={jwt} />
                )}
            </div>
        );
    }
}

export default App;
