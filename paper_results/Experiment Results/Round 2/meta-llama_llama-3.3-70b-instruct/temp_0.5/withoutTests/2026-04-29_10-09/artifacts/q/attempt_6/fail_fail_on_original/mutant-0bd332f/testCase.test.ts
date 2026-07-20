import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when reduce is called on a sparse array', () => {
        const sparseArray = [1, , 3];
        const promise = Q(sparseArray).then(array => {
            array.reduce((a, b) => {
                if (a === undefined) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }
                return a + b;
            });
        });
        expect(promise).rejects.toThrow(TypeError);
    });
});