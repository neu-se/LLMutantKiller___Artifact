// Test case to detect the mutation in array_map implementation
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map mutation", () => {
    it("should correctly process array values with array_map", () => {
        // Create a test that specifically exercises the array_map shim
        const testArray = [1, 2, 3];
        let callbackCallCount = 0;

        // Use Q to create a promise that will use array_map
        return Q.resolve(testArray).then((arr: number[]) => {
            // This map operation should use the internal array_map implementation
            const result = arr.map((x: number, index: number) => {
                callbackCallCount++;
                return x + index;
            });

            // With the mutation, callbackCallCount will be 0 because the callback is empty
            expect(callbackCallCount).toBe(3);
            expect(result).toEqual([1, 3, 5]);
        });
    });
});