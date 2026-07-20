describe('array_indexOf', () => {
    it('should find the index of an element in an array', () => {
        const array = [1, 2, 3, 4, 5];
        const value = 3;
        const indexOf = (arr, val) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === val) {
                    return i;
                }
            }
            return -1;
        };
        const index = indexOf(array, value);
        expect(index).toBe(2);
    });
});