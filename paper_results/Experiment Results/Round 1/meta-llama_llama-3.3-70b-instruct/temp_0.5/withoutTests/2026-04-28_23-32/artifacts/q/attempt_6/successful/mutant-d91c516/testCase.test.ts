import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q.keys', () => {
    it('should return a function that returns a promise', () => {
        const keysFunction = q.keys;
        expect(typeof keysFunction).toBe('function');
        const promise = keysFunction({ a: 1, b: 2 });
        expect(typeof promise.then).toBe('function');
    });
});