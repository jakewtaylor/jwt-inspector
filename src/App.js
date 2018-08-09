import React, { Component } from 'react';

import { matchesToken } from './helpers/matchesToken';

import TokenInspector from './TokenInspector';

class App extends Component {
    state = {
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInRlc3QiOnRydWUsInRlc3QyIjoxMiwgImFub3RoZXJPYmoiOiB7ImxldCI6ICJ1cyIsICJzZWUiOiB0cnVlIH0gfQ.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vdW5pdmVyc2l0aWVzLnRlc3QvYXBpL2xvZ2luIiwiaWF0IjoxNTMzODE0ODA1LCJleHAiOjE1MzM4MTQ4NjUsIm5iZiI6MTUzMzgxNDgwNSwianRpIjoiRk1DNkx2a3E4Q0syMFpBOCJ9.qYrROtPLitVpA5eeAqYPiI47inakYeSw0-ZPPmoq_B8',
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
