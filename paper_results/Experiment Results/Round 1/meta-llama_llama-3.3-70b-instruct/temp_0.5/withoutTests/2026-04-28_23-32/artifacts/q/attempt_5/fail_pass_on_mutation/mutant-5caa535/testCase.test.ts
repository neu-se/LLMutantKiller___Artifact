describe("array_indexOf", () => {
    it("should handle array indexing correctly", () => {
        const array = [1, 2, 3];
        function array_indexOf(arr, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === value) {
                    return i;
                }
            }
            return -1;
        }
        expect(array_indexOf(array, 1)).toBe(0);
        expect(array_indexOf(array, 2)).toBe(1);
        expect(array_indexOf(array, 3)).toBe(2);
        expect(array_indexOf(array, 4)).toBe(-1);
    });

    it.skip("should fail for mutated code", () => {
        const array = [1, 2, 3];
        function array_indexOf(arr, value) {
            for (var i = 0; i <= arr.length; i++) {
                if (arr[i] === value) {
                    return i;
                }
            }
            return -1;
        }
        expect(() => array_indexOf(array, 4)).toThrow();
    });
});