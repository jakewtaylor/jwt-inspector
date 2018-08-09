const parse = str => JSON.parse(atob(str));

const TokenSplitter = ({ token, children }) => {
    const [encodedHeader, encodedPayload, signature] = token.split('.');

    const header = parse(encodedHeader);
    const payload = parse(encodedPayload);

    return children(header, payload, signature);
};

export default TokenSplitter;
