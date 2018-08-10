class Persister {
    static KEY = 'state';

    static store (data) {
        const serialized = JSON.stringify(data);
        localStorage.setItem(Persister.KEY, serialized);
    }

    static load () {
        const data = localStorage.getItem(Persister.KEY);

        if (!data) return null;

        return JSON.parse(data);
    }
}

export default Persister;
