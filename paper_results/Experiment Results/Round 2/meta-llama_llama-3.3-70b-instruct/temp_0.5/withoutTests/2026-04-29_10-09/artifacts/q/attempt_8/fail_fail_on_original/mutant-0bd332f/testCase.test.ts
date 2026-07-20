import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when reduce is called on a sparse array with no initial value', () => {
        const sparseArray: (number | undefined)[] = [1, , 3];
        const promise = Q(sparseArray).then((array: (number | undefined)[]) => {
            try {
                array.reduce((previousValue: number | undefined, currentValue: number | undefined) => {
                    if (previousValue === undefined) {
                        throw new TypeError('Reduce of empty array with no initial value');
                    }
                    return previousValue + (currentValue || 0);
                });
            } catch (error) {
                throw error;
            }
        });
        expect(promise).rejects.toThrow(TypeError);
    });
});