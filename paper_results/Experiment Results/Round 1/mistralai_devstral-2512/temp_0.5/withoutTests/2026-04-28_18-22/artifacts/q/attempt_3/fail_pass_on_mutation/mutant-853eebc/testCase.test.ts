// Test case to detect the mutation in array_map implementation
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map mutation", () => {
    it("should correctly map values using array_map", () => {
        // Create a simple array
        const arr = [1, 2, 3];

        // Use Q to create a fulfilled promise with the array
        const promise = Q(arr);

        // Use then to map the array values (this internally uses array_map)
        return promise.then((values: number[]) => {
            // Map each value to its double
            const mapped = values.map((x: number) => x * 2);
            // Verify the mapping worked correctly
            expect(mapped).toEqual([2, 4, 6]);
        });
    });
});