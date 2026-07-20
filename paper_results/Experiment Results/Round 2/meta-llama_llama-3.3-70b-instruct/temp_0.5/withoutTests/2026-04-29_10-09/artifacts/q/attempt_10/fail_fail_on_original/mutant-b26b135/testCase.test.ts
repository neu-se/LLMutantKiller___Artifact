import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return keys when fulfilled with an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q.fulfill(obj);
        return promise.then((value) => {
            expect(Object.keys(value)).toEqual(['a', 'b', 'c']);
        });
    });

    it('should throw an error when keys method is not implemented', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q.fulfill(obj);
        expect(() => promise.get('keys')).toThrowError();
    });
});