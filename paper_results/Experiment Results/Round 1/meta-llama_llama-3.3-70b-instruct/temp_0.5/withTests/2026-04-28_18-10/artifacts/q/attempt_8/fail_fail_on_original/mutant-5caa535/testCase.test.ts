import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle array_indexOf correctly", () => {
        // Create a test array
        const testArray = [1, 2, 3, 4, 5];

        // Check if the index is correct for an array with a single element
        expect(Q([5]).thenResolve([5]).then(array => array.indexOf(5))).toBe(0);

        // Check if the function handles an array with a large number of elements
        const largeArray = new Array(1000).fill(5);
        expect(Q([largeArray]).thenResolve([largeArray]).then(array => array.indexOf(5))).toBe(0);

        // Check if the function returns -1 for an empty array
        expect(Q([]).thenResolve([]).then(array => array.indexOf(5))).toBe(-1);
    });
});