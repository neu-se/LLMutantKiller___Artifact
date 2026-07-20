import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q.keys', () => {
    it('should return a promise that resolves with the keys of the object', async () => {
        const object = { a: 1, b: 2 };
        const promise = q(object).keys();
        const result = await promise;
        expect(result).toEqual(Object.keys(object));
    });
});