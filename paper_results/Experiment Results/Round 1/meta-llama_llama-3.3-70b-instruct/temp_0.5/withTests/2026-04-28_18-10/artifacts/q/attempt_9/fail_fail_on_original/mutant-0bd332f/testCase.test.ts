describe('Q', () => {
    it('should iterate over sparse arrays and throw an error when no initial value is provided in the mutated code', () => {
        const array = [1, , 3];
        const callback = function(basis: any, value: any, index: any) {
            return basis;
        }
        let result = array.reduce(callback);
        expect(result).toBeUndefined();
    });
});