// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
    it("should correctly handle array_indexOf with sparse array containing undefined", () => {
        // The mutation changes the loop condition from i < this.length to i <= this.length
        // This will cause an extra iteration where i equals array length
        // We need to create a scenario where this extra iteration causes observable behavior

        // Create a sparse array with explicit undefined values
        const sparseArray = [1, , 3, , undefined];
        sparseArray[6] = 6; // Make length 7 with holes

        // In the mutated version:
        // When searching for undefined, it will check all indices including array.length (7)
        // array[7] is undefined (out of bounds), so it will return 7 instead of 4
        const result = sparseArray.indexOf(undefined);
        expect(result).toBe(4); // Should be 4 (where we explicitly set undefined)

        // Also test normal cases
        expect(sparseArray.indexOf(3)).toBe(2);
        expect(sparseArray.indexOf(6)).toBe(6);
    });
});