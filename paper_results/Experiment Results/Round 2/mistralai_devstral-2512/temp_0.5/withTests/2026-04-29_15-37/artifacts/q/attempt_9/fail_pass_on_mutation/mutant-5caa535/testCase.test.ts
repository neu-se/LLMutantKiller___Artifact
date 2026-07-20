// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
    it("should correctly handle array_indexOf edge case with array length", () => {
        // The mutation changes the loop condition from i < this.length to i <= this.length
        // This will cause an extra iteration where i equals array length
        // We need to create a scenario where this extra iteration causes observable behavior

        // Create an array where we can detect the out-of-bounds access
        const testArray = [1, 2, 3];

        // In the mutated version:
        // When searching for undefined, it will check all indices including array.length (3)
        // array[3] is undefined (out of bounds), so it will return 3 instead of -1
        const result = testArray.indexOf(undefined);
        expect(result).toBe(-1); // Should be -1, but mutated version returns 3

        // Verify normal functionality still works
        expect(testArray.indexOf(2)).toBe(1);
        expect(testArray.indexOf(4)).toBe(-1);
    });
});