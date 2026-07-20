import { Q } from "../q";

describe('Q', () => {
    it('should return keys when fulfilled with an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q(obj);
        return promise.then((value) => {
            expect(Object.keys(value)).toEqual(['a', 'b', 'c']);
        });
    });

    it('should throw an error when keys() is called on a promise', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q(obj);
        expect(() => promise.keys()).toThrowError();
    });
});