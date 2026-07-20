import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle array_indexOf correctly", () => {
        // Create a test array
        const testArray = [1, 2, 3, 4, 5];

        // Use Q's array_indexOf function
        const index = Q.array_indexOf(testArray, 3);

        // Check if the index is correct
        expect(index).toBe(2);
    });
});