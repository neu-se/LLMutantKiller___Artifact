import { Q } from "../../../../../q";

describe('Promise', () => {
    it('should throw an error when the set method is not implemented', () => {
        const obj = {};
        const promise = Q(obj).set('a', 1);
        return promise.then(() => {
            throw new Error('This should not be called');
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});