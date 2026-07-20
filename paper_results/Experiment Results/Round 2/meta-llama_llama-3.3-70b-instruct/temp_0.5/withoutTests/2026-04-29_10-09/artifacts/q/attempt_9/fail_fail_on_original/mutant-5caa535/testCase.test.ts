describe('Q', () => {
    it('should handle array_indexOf correctly', () => {
        const array = [1, 2, 3];
        const indexOf = function(arr, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === value) {
                    return i;
                }
            }
            return -1;
        };
        expect(indexOf(array, 2)).toBe(1);
        expect(indexOf(array, 4)).toBe(-1);
        const largeArray = new Array(1000);
        largeArray[999] = 1;
        expect(indexOf(largeArray, 1)).toBe(999);
        const largeArray2 = new Array(1001);
        largeArray2[1000] = 1;
        expect(() => {
            for (var i = 0; i <= largeArray2.length; i++) {
                if (largeArray2[i] === 1) {
                    return i;
                }
            }
            return -1;
        }).toThrow();
    });
});