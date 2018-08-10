import React, { Component } from 'react';
import uuid from 'uuid/v4';

import Persister from './helpers/Persister';

import ParseToken from './ParseToken';
import TokenAnatomy from './TokenAnatomy';
import TokenInspector from './TokenInspector';
import Icon from './Icon';

class App extends Component {
    state = {
        jwts: Persister.load() || {
            [uuid()]: '',
        },
    }

    handleJwtChange = id => e => {
        const jwt = e.target.value;
        this.setState(state => ({
            jwts: {
                ...state.jwts,
                [id]: jwt,
            },
        }))
    }

    addJwt = () => this.setState(state => ({
        jwts: {
            ...state.jwts,
            [uuid()]: '',
        },
    }))

    reset = id => () => this.setState(state => ({
        jwts: {
            ...state.jwts,
            [id]: '',
        },
    }))

    remove = id => () => this.setState((state) => {
        // Create new object of JWTs so we don't mutate state
        const jwts = { ...state.jwts };
        // Delete the specified id from our object
        delete jwts[id];
        // Return our object as the new state
        return { jwts };
    });

    save = () => {
        const { jwts } = this.state;

        const data = Object.entries(jwts).reduce((acc, [key, val]) => {
            if (val) {
                acc[key] = val;
            }

            return acc;
        }, {});

        Persister.store(data);
    }

    render () {
        const { jwts } = this.state;

        return (
            <div className="page">
                <section className="item --condensed">
                    <div className="actions">
                        <button onClick={this.save} className="action" title="Save">
                            <Icon name="save" />
                            <span className="label">
                                Save
                            </span>
                        </button>

                        <a href="https://github.com/jakewtaylor/jwt-inspector" className="action" target="_blank" rel="noopener noreferrer">
                            <Icon name="help" />
                            <span className="label">
                                GitHub
                            </span>
                        </a>
                    </div>
                </section>

                {Object.entries(jwts).map(([id, jwt]) => (
                    <section className="item" key={id}>
                        <div className="jwt_field__container">
                            <input
                                className="jwt_field"
                                placeholder="Enter JWT here..."
                                value={jwt}
                                onChange={this.handleJwtChange(id)}
                            />

                            <button onClick={this.reset(id)} className="action" title="Reset">
                                <Icon name="not_interested" />
                            </button>

                            <button onClick={this.remove(id)} className="action" title="Remove">
                                <Icon name="clear" />
                            </button>
                        </div>

                        <ParseToken
                            token={jwt}
                            valid={(header, payload, signature) => (
                                <TokenInspector
                                    header={header}
                                    payload={payload}
                                    signature={signature}
                                />
                            )}
                            invalid={() => (
                                <div className="invalid_token">
                                    <p>That token doesn't seem to be valid.</p>
                                    <p>Tokens should match the following format:</p>

                                    <TokenAnatomy />
                                </div>
                            )}
                        />
                    </section>
                ))}

                <div className="add" onClick={this.addJwt}>
                    <Icon name="add" className="add__icon" />
                    <p>Add another JWT</p>
                </div>
            </div>
        );
    }
}

export default App;
