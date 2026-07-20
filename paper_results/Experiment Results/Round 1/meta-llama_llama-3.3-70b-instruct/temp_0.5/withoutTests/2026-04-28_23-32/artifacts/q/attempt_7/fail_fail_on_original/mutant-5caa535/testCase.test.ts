describe("array_indexOf", () => {
    it("should handle array indexing correctly and fail on mutated code", () => {
        const array = [1, 2, 3];
        function array_indexOfOriginal(arr, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === value) {
                    return i;
                }
            }
            return -1;
        }
        function array_indexOfMutated(arr, value) {
            for (var i = 0; i <= arr.length; i++) {
                if (arr[i] === value) {
                    return i;
                }
            }
            return -1;
        }
        expect(array_indexOfOriginal(array, 1)).toBe(0);
        expect(array_indexOfOriginal(array, 2)).toBe(1);
        expect(array_indexOfOriginal(array, 3)).toBe(2);
        expect(array_indexOfOriginal(array, 4)).toBe(-1);
        // Test that the original code does not throw an error
        expect(() => array_indexOfOriginal(array, 4)).not.toThrow();
        // Test that the mutated code throws an error
        expect(() => array_indexOfMutated(array, 4)).toThrow();
    });
});