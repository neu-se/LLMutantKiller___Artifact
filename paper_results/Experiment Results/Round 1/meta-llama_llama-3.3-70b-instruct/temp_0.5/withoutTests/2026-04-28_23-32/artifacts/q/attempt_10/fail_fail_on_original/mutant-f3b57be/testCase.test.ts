const q = require("../../../../../../../../../subject_repositories/q/q.js")();
const arrayReduce = q.array_reduce;

describe('Q', () => {
    it('should handle array reduce correctly', async () => {
        const array = [1, 2, 3];
        const callback = (a: number, b: number) => a + b;
        const result = arrayReduce(array, callback, 0);
        expect(result).toBe(6);
    });

    it('should throw an error when reduce is called with no initial value on a non-empty array in the original code', async () => {
        const array = [1, 2, 3];
        const callback = (a: number, b: number) => a + b;
        expect(() => arrayReduce(array, callback)).toThrow(TypeError);
    });

    it('should not throw an error when reduce is called with no initial value on a non-empty array in the mutated code', async () => {
        const array = [1, 2, 3];
        const callback = (a: number, b: number) => a + b;
        expect(() => arrayReduce(array, callback)).not.toThrow(TypeError);
    });
});