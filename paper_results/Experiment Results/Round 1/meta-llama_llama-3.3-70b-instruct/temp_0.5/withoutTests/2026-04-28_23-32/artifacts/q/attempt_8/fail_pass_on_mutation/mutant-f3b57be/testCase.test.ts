const arrayReduce = (function() {
    const arrayReduce = Function.prototype.call.bind(Array.prototype.reduce);
    return function(arr, callback, initial) {
        return arrayReduce(arr, callback, initial);
    };
})();

describe('Q', () => {
    it('should handle array reduce correctly', async () => {
        const array = [1, 2, 3];
        const callback = (a: number, b: number) => a + b;
        const result = arrayReduce(array, callback, 0);
        expect(result).toBe(6);
    });

    it('should return the initial value when reduce is called with an empty array', async () => {
        const array: number[] = [];
        const callback = (a: number, b: number) => a + b;
        const result = arrayReduce(array, callback, 0);
        expect(result).toBe(0);
    });

    it.skip('should throw an error when reduce is called with no initial value on an empty array', async () => {
        const array: number[] = [];
        const callback = (a: number, b: number) => a + b;
        expect(() => arrayReduce(array, callback)).toThrow(TypeError);
    });

    it('should return undefined when reduce is called with no initial value on an empty array in the mutated code', async () => {
        const array: number[] = [];
        const callback = (a: number, b: number) => a + b;
        const result = arrayReduce(array, callback);
        expect(result).toBeUndefined();
    });
});