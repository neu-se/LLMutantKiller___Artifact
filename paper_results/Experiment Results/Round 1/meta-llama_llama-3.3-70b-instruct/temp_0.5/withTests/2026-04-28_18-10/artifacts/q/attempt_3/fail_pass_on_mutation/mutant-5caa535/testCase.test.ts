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

        // Check if the index is correct
        expect(array_indexOf(testArray, 3)).toBe(2);
    });
});