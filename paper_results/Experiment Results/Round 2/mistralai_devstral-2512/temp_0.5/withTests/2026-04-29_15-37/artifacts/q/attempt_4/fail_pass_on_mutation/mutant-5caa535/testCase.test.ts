// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
    it("should correctly handle array_indexOf with sparse arrays", () => {
        // The mutation changes the loop condition from i < this.length to i <= this.length
        // This will cause an extra iteration where i equals array length
        // In sparse arrays, this can cause incorrect behavior

        // Create a sparse array with holes
        const sparseArray = new Array(5);
        sparseArray[0] = 1;
        sparseArray[2] = 3;
        sparseArray[4] = 5;

        // The mutated version will check sparseArray[5] (which is undefined)
        // If we search for undefined, it might incorrectly return 5
        const result = sparseArray.indexOf(undefined);
        expect(result).toBe(-1);

        // Also test with a value that exists
        expect(sparseArray.indexOf(3)).toBe(2);

        // Test edge case: array with only holes
        const allHoles = new Array(3);
        expect(allHoles.indexOf(undefined)).toBe(-1);
    });
});