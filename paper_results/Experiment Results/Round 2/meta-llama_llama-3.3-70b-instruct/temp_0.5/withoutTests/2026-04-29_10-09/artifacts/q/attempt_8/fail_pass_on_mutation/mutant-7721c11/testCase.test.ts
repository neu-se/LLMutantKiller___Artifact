describe('array_indexOf', () => {
    it('should return the correct index when the value is found in the array', () => {
        const array = [1, 2, 3, 4, 5];
        const value = 3;
        const array_indexOf = (arr, val) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === val) {
                    return i;
                }
            }
            return -1;
        };
        const index = array_indexOf(array, value);
        expect(index).toBe(2);
        expect(array_indexOf(array, 6)).toBe(-1);
    });
});