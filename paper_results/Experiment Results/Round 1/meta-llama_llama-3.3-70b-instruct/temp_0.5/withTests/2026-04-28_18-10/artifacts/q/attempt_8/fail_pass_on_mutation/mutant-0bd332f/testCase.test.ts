describe('Q', () => {
    it('should throw an error when array_reduce is called with no initial value and array is sparse in the mutated code', () => {
        const array = [1, , 3];
        const callback = function(basis: any, value: any, index: any) {
            return basis;
        }
        try {
            array.reduce(callback);
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        }
    });
});