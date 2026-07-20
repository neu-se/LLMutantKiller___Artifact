import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle array_indexOf correctly", () => {
        // Create a test array
        const testArray = [1, 2, 3, 4, 5];

        // Check if the index is correct for an array with a single element
        expect(testArray.indexOf(3)).toBe(2);

        // Check if the function handles an array with a large number of elements
        const largeArray = new Array(1000).fill(5);
        expect(largeArray.indexOf(5)).toBe(0);

        // Check if the function returns -1 for an empty array
        expect([].indexOf(5)).toBe(-1);
    });
});