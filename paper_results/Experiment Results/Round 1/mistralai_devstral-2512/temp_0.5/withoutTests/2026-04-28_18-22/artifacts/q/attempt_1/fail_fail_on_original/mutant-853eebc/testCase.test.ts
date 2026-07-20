// Test case to detect the mutation in array_map implementation
import { Q } from "./q.js";

describe("Q library array_map mutation", () => {
    it("should correctly map values using Q.all with array_map", async () => {
        // Create an array of promises that resolve to numbers
        const promises = [
            Q.resolve(1),
            Q.resolve(2),
            Q.resolve(3)
        ];

        // Use Q.all to wait for all promises to resolve
        const result = await Q.all(promises);

        // Verify the result is an array with the expected values
        expect(result).toEqual([1, 2, 3]);

        // Now test with a more complex mapping scenario
        const doubledPromises = promises.map(p => p.then(x => x * 2));
        const doubledResult = await Q.all(doubledPromises);

        // The mutation breaks array_map which is used internally by Q.all
        // This should fail in the mutated version because the callback is not executed
        expect(doubledResult).toEqual([2, 4, 6]);
    });
});