import { PureComponent} from 'react';

const parse = (token) => {
    const [rawHeader, rawPayload, signature] = token.split('.');

    const header = JSON.parse(atob(rawHeader));
    const payload = JSON.parse(atob(rawPayload));

    return [header, payload, signature];
};

class ParseToken extends PureComponent {
    render () {
        const { valid, invalid, token } = this.props;

        let header, payload, signature;

        if (!token) return null;

        try {
            [header, payload, signature] = parse(token);
        } catch (err) {
            return invalid(err);
        }

        return valid(header, payload, signature);
    }
}

export default ParseToken;
