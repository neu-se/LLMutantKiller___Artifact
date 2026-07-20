const q = require("../../../../../../../../../subject_repositories/q/q.js")();
const arrayReduce = q.array_reduce;

describe('Q', () => {
    it('should handle array reduce correctly', async () => {
        const array = [1, 2, 3];
        const callback = (a, b) => a + b;
        const result = arrayReduce(array, callback, 0);
        expect(result).toBe(6);
    });

    it('should return the initial value when reduce is called with an empty array', async () => {
        const array = [];
        const callback = (a, b) => a + b;
        const result = arrayReduce(array, callback, 0);
        expect(result).toBe(0);
    });

    it('should throw an error when reduce is called with no initial value on a non-empty array', async () => {
        const array = [1, 2, 3];
        const callback = (a, b) => a + b;
        expect(() => arrayReduce(array, callback)).toThrow(TypeError);
    });

    it('should throw an error when reduce is called with no initial value on an empty array in the mutated code', async () => {
        const array = [];
        const callback = (a, b) => a + b;
        // In the mutated code, arrayReduce(array, callback) should throw an error
        // because the condition if (arguments.length === 1) is changed to if (false)
        expect(() => arrayReduce(array, callback)).toThrow(TypeError);
    });
});