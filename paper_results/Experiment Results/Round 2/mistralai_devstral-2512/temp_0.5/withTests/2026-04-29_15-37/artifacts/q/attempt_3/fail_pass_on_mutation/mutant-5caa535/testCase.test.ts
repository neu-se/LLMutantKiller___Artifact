// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
    it("should correctly handle array_indexOf edge cases", () => {
        // The mutation changes the loop condition from i < this.length to i <= this.length
        // This will cause an out-of-bounds access when i equals this.length
        // We need to test with an array where this would cause observable behavior

        // Create a sparse array where the last element is at index 2
        // but length is 3 (with a hole at index 2)
        const sparseArray = [1, , 3]; // length is 3, but only indices 0 and 2 have values

        // In the mutated version, when i=3 (array length), it will try to access sparseArray[3]
        // which is undefined, and if the value we're searching for is undefined,
        // it will incorrectly return 3 instead of -1

        // Test searching for undefined in a sparse array
        const result = sparseArray.indexOf(undefined);
        expect(result).toBe(-1); // Should be -1 since undefined is not explicitly in the array

        // Also test with a regular array to ensure normal behavior
        const regularArray = [1, 2, 3];
        expect(regularArray.indexOf(2)).toBe(1);
        expect(regularArray.indexOf(4)).toBe(-1);
    });
});