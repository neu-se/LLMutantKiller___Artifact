import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return keys of an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = q(obj);
        return promise.keys().then((keys) => {
            expect(keys.length).toBeGreaterThan(0);
            expect(promise.dispatch("keys", []).then((result) => result)).rejects.toThrow();
        });
    });
});