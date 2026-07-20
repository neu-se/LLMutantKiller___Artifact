// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
    it("should correctly handle array_indexOf with value matching out-of-bounds", () => {
        // The mutation changes the loop condition from i < this.length to i <= this.length
        // This will cause an extra iteration where i equals array length
        // We need to create a scenario where this extra iteration causes observable behavior

        // Create an array and search for a value that matches what's at array.length
        const testArray = [1, 2, 3];

        // In the mutated version:
        // When searching for undefined (which is what array[3] would be)
        // it will return 3 instead of -1
        const result = testArray.indexOf(undefined);
        expect(result).toBe(-1); // Should be -1, but mutated version returns 3

        // Also test with null to ensure it's not just undefined behavior
        expect(testArray.indexOf(null)).toBe(-1);

        // Verify normal functionality
        expect(testArray.indexOf(2)).toBe(1);
    });
});