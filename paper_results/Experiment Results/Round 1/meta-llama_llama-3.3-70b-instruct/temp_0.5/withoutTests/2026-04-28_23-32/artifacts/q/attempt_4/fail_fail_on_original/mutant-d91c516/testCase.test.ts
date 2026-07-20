import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q.keys', () => {
    it('should return a promise for the keys of the object', () => {
        const object = { a: 1, b: 2 };
        const promise = q(object).keys();
        expect(promise.inspect().state).toBe('fulfilled');
        expect(promise.inspect().value).toEqual(Object.keys(object));
    });
});