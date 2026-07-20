// Test case to detect the mutation in the array_reduce shim
import { array_reduce } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should handle sparse arrays with initial value", () => {
        // Create a sparse array where first element is missing
        const sparseArray = [, 2, 3]; // index 0 is missing

        // Test the array_reduce shim directly
        const result = array_reduce(sparseArray, (acc: number, val: number) => {
            return acc + val;
        }, 0);

        // Original code should skip missing index 0 and sum 2 + 3 = 5
        // Mutated code (if false) would throw TypeError
        expect(result).toBe(5);
    });
});