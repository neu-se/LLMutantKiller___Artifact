// Test case to detect the mutation in array_indexOf shim
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation detection", () => {
    it("should correctly find index of value in array", () => {
        // Create a test array
        const testArray = [1, 2, 3, 4, 5];

        // Use Q to wrap the array and test the indexOf behavior
        // The mutation causes an off-by-one error in the indexOf implementation
        return Q(testArray).then((arr: number[]) => {
            // Test finding an element that exists
            const index = arr.indexOf(3);
            expect(index).toBe(2);

            // Test finding an element that doesn't exist
            const notFoundIndex = arr.indexOf(99);
            expect(notFoundIndex).toBe(-1);

            // Test edge case: finding the last element
            const lastIndex = arr.indexOf(5);
            expect(lastIndex).toBe(4);
        });
    });
});