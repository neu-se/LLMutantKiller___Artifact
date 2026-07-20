// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
    it("should correctly handle array_indexOf with value at last index", () => {
        // The mutation changes the loop condition from i < this.length to i <= this.length
        // This will cause an extra iteration where i equals array length
        // We need to create a scenario where this extra iteration causes observable behavior

        // Create an array where we search for a value that matches the out-of-bounds value
        const testArray = [1, 2, 3, 4, 5];

        // In the mutated version:
        // When searching for undefined, it will check all indices including array.length
        // array[5] is undefined, so it will return 5 instead of -1
        const result = testArray.indexOf(undefined);
        expect(result).toBe(-1); // Should be -1, but mutated version returns 5

        // Also test normal cases to ensure they still work
        expect(testArray.indexOf(3)).toBe(2);
        expect(testArray.indexOf(5)).toBe(4);
    });
});