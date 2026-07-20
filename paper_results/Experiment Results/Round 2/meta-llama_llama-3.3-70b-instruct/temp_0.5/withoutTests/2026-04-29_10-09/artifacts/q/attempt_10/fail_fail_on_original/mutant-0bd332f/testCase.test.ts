import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when reduce is called on a sparse array without initial value in mutated code', () => {
        const sparseArray: (number | undefined)[] = [1, , 3];
        const promise = Q(sparseArray).then((array: (number | undefined)[]) => {
            array.reduce((previousValue: number | undefined, currentValue: number | undefined) => {
                if (previousValue === undefined) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }
                return previousValue + (currentValue || 0);
            });
        });
        expect(promise).rejects.toThrow(TypeError);
    });
});