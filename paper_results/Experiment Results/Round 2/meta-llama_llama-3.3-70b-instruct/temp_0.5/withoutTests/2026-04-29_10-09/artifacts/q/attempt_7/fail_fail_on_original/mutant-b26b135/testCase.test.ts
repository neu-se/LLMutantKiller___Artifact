import { Q } from "../q.js";

describe('Q', () => {
    it('should return keys when fulfilled with an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q.fulfill(obj);
        return Q.keys(promise).then((keys) => {
            if (keys === undefined) {
                throw new Error('keys() method is not implemented');
            }
            expect(keys).toEqual(Object.keys(obj));
        }).catch((error) => {
            expect(error).toBeUndefined();
        });
    });
});