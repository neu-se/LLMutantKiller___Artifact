import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return keys when fulfilled with an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q.fulfill(obj);
        return promise.get('keys').then((keys) => {
            expect(keys).toEqual(['a', 'b', 'c']);
        });
    });
});