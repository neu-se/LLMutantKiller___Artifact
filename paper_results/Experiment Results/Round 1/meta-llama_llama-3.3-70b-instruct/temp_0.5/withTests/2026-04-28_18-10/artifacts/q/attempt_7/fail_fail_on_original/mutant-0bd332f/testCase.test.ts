describe('Q', () => {
    it('should throw TypeError when array_reduce is called with no initial value and array is sparse in the mutated code', () => {
        const array = [1, , 3];
        const callback = function(basis: any, value: any, index: any) {
            return basis;
        }
        try {
            array.reduce(callback);
            expect(false).toBe(true);
        } catch (error) {
            if (error instanceof TypeError) {
                expect(true).toBe(true);
            } else {
                expect(false).toBe(true);
            }
        }
    });
});