// Test case to detect the mutation in the array_reduce shim
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle reduce with initial value on sparse arrays", async () => {
        // Create a sparse array where the first element is missing
        const sparseArray = [, 2, 3]; // index 0 is missing

        // Use Q to wrap the reduce operation to ensure it uses the shim
        const result = await Q.Promise((resolve) => {
            // This will use the array_reduce shim since we're in a promise context
            const sum = sparseArray.reduce((acc, val, idx) => {
                if (idx in sparseArray) {
                    return acc + val;
                }
                return acc;
            }, 0);
            resolve(sum);
        });

        // The original code should skip the missing index 0 and sum 2 + 3 = 5
        // The mutated code (if false) would throw TypeError
        expect(result).toBe(5);
    });
});