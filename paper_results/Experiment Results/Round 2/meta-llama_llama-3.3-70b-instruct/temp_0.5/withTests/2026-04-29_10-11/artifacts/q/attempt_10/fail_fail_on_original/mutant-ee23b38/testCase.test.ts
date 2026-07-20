import { Q } from "../../../../../q";

describe('Promise', () => {
    it('should throw an error when the set method is called on an object without implementation', () => {
        const obj = {};
        const promise = Q(obj).set('a', 1);
        return promise.then(() => {
            throw new Error('Expected an error to be thrown');
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});