import { Q } from "./q";

describe('Q', () => {
    it('should return keys when fulfilled with an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q.fulfill(obj);
        return promise.get('keys').then((keys: string[]) => {
            if (keys === undefined) {
                throw new Error('keys() method is not implemented');
            }
            expect(keys).toEqual(Object.keys(obj));
        }).catch((error: any) => {
            expect(error).toBeUndefined();
        });
    });
});