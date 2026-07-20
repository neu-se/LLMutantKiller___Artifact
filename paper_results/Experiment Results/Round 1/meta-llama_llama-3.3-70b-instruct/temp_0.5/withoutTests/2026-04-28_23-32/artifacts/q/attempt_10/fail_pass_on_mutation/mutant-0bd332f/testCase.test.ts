describe('array_reduce', () => {
    it('should not throw error when array is sparse and no initial value is provided', () => {
        const array = [];
        array[10] = 1;
        try {
            array.reduce((basis, value) => basis + value);
            expect(true).toBe(true);
        } catch (e) {
            expect(e).toBeUndefined();
        }
    });
});