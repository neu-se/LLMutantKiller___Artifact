describe('Q', () => {
    it('should iterate over sparse arrays without throwing an error in the original code but throw an error in the mutated code', () => {
        const array = [1, , 3];
        let index = 0;
        array.forEach((value) => {
            index++;
        });
        expect(index).toBe(2);
    });
});