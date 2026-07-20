describe('reduce function', () => {
    it('should reduce an array correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (basis: number, value: number) => basis + value;
        const expected = 15;
        let result = 0;

        for (let index = 0; index < array.length; index++) {
            if (index in array) {
                result = callback(result, array[index]);
            }
        }

        expect(result).toBe(expected);
    });
});