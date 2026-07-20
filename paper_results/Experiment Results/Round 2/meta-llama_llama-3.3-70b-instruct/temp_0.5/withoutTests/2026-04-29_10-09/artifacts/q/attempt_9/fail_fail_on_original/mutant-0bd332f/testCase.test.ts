import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw TypeError when reduce is called on a sparse array with initial value', () => {
        const sparseArray: (number | undefined)[] = [1, , 3];
        const promise = Q(sparseArray).then((array: (number | undefined)[]) => {
            try {
                array.reduce((previousValue: number | undefined, currentValue: number | undefined) => {
                    if (previousValue === undefined) {
                        return 0;
                    }
                    return previousValue + (currentValue || 0);
                }, 0);
            } catch (error) {
                throw error;
            }
        });
        expect(promise).resolves.not.toThrow(TypeError);
    });
});