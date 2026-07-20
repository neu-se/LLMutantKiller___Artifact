describe("array_indexOf", () => {
    it("should handle array indexing correctly and fail on mutated code", () => {
        const array: number[] = [1, 2, 3];
        function array_indexOf(arr: number[], value: number): number {
            for (let i = 0; i < arr.length; i++) {
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
        expect(() => array_indexOf(array, 4)).not.toThrow();
    });
});