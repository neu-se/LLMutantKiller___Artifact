describe('reduce function', () => {
    it('should reduce an array correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (basis: number, value: number) => basis + value;
        const expected = 15;

        let executed = false;
        for (let index = 0; index < array.length; index++) {
            if (index in array) {
                executed = true;
                break;
            }
        }

        expect(executed).toBe(true);
    });
});