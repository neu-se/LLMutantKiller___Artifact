// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
    it("should correctly handle array_indexOf with undefined values", () => {
        // The mutation changes the loop condition from i < this.length to i <= this.length
        // This causes an extra iteration where i equals array length
        // We need to trigger this extra iteration and make it observable

        // Create an array where the last element is undefined
        const arrayWithUndefined = [1, 2, undefined];

        // In the mutated version, when searching for undefined:
        // 1. It will find the undefined at index 2 (correct)
        // 2. Then continue to check index 3 (array length)
        // 3. array[3] is undefined (out of bounds)
        // 4. The condition "if (this[i] === value)" will be true
        // 5. It will incorrectly return 3 instead of 2

        const result = arrayWithUndefined.indexOf(undefined);
        expect(result).toBe(2); // Should be 2, but mutated version returns 3

        // Also test with a value that doesn't exist
        expect(arrayWithUndefined.indexOf(99)).toBe(-1);
    });
});