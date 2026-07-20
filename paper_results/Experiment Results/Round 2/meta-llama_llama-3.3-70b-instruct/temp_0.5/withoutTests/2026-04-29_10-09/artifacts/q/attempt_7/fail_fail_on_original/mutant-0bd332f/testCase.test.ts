import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when reduce is called on a sparse array', () => {
        const sparseArray: (number | undefined)[] = [1, , 3];
        const promise = Q(sparseArray).then((array: (number | undefined)[]) => {
            try {
                array.reduce((a: number, b: number) => a + b);
            } catch (error) {
                throw error;
            }
        });
        expect(promise).rejects.toThrow(TypeError);
    });
});