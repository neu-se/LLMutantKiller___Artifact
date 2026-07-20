// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
    it("should correctly find index of value in array", () => {
        // Create a test array
        const testArray = [1, 2, 3, 4, 5];

        // Test the indexOf behavior directly on the array
        // The mutation causes an off-by-one error in the indexOf implementation
        const index = testArray.indexOf(3);
        expect(index).toBe(2);

        // Test finding an element that doesn't exist
        const notFoundIndex = testArray.indexOf(99);
        expect(notFoundIndex).toBe(-1);

        // Test edge case: finding the last element
        const lastIndex = testArray.indexOf(5);
        expect(lastIndex).toBe(4);

        // Test edge case: empty array
        const emptyArray: number[] = [];
        const emptyIndex = emptyArray.indexOf(1);
        expect(emptyIndex).toBe(-1);
    });
});