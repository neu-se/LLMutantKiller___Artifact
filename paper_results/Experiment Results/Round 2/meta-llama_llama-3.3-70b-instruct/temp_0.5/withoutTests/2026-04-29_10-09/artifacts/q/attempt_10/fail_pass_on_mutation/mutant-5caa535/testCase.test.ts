describe('Q', () => {
    it('should handle array_indexOf correctly', () => {
        const array = [1, 2, 3];
        const indexOf = function(arr: any[], value: any): number {
            for (let i = 0; i < arr.length; i++) {
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
        expect(indexOf(largeArray2, 1)).toBe(1000);
        const testArray = new Array(1);
        testArray[0] = 1;
        expect(indexOf(testArray, 1)).toBe(0);
        expect(indexOf(testArray, 2)).toBe(-1);
    });
});