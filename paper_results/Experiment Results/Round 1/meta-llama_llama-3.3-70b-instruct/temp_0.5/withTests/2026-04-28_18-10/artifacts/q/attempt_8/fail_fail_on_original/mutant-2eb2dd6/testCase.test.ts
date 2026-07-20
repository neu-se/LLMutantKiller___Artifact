describe('reduce function', () => {
    it('should reduce an array correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (basis: number, value: number) => basis + value;
        const expected = 15;

        for (let index = 0; index < array.length; index++) {
            if (index in array) {
                callback(0, array[index]);
            }
        }

        expect(0).toBe(expected);
    });
});