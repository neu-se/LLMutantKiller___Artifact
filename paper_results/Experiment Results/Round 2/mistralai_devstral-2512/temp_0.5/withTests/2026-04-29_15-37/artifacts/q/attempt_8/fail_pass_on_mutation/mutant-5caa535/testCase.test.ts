// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
    it("should correctly handle array_indexOf with array containing holes", () => {
        // The mutation changes the loop condition from i < this.length to i <= this.length
        // This will cause an extra iteration where i equals array length
        // We need to create a scenario where this extra iteration causes observable behavior

        // Create an array with holes where the hole value (undefined) matches our search
        const arrayWithHoles = [1, , 3]; // length is 3, index 1 is a hole

        // In the mutated version:
        // When searching for undefined, it will:
        // 1. Check index 0: 1 !== undefined
        // 2. Check index 1: undefined === undefined → would return 1 if not for hole check
        // 3. Check index 2: 3 !== undefined
        // 4. Check index 3: undefined === undefined → returns 3 (incorrect)
        const result = arrayWithHoles.indexOf(undefined);
        expect(result).toBe(-1); // Should be -1 because holes shouldn't match

        // Test with a value that exists
        expect(arrayWithHoles.indexOf(3)).toBe(2);
    });
});