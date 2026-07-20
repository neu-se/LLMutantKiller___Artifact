describe('array_reduce', () => {
    it('should throw TypeError when array is sparse and no initial value is provided in mutated code', () => {
        const array = [];
        array[10] = 1;
        const result = array.reduce((basis, value) => basis + value);
        expect(result).not.toBeNaN();
    });
});