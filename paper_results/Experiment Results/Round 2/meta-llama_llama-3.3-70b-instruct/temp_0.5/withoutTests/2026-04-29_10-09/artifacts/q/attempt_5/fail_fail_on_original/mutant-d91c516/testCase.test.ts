import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise that resolves to an array of keys when Q.keys is called with an object', () => {
        const object = { a: 1, b: 2, c: 3 };
        const promise = Q.keys(object);
        return promise.then(keys => {
            expect(keys).toEqual(Object.keys(object));
        });
    });
});