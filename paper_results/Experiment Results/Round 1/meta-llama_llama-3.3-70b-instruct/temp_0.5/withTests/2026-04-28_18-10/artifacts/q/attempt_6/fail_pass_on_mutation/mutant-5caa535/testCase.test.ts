import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle array_indexOf correctly", () => {
        // Create a test array
        const testArray = [1, 2, 3, 4, 5];

        // Use Q's array_indexOf function
        const array_indexOf = Q.array_indexOf || function (array: any[], value: any): number {
            for (let i = 0; i < array.length; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            return -1;
        };

        // Check if the index is correct for an array with a single element
        expect(array_indexOf([5], 5)).toBe(0);

        // Check if the function handles an array with a large number of elements
        const largeArray = new Array(1000).fill(5);
        expect(array_indexOf(largeArray, 5)).toBe(0);
    });
});