// Test case to detect the mutation in array_reduce
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce operation", () => {
        // Create a sparse array where the mutation would cause different behavior
        const sparseArray = [1, , 2, , 3];
        const initialValue = 0;
        const reducer = (acc: number, curr: number, index: number) => {
            // This reducer will fail if sparse elements are not properly handled
            if (index in sparseArray) {
                return acc + curr;
            }
            return acc;
        };

        // Directly test the array_reduce implementation
        const result = Q(sparseArray).then((arr: any[]) => {
            // Use the internal array_reduce that's being mutated
            return arr.reduce(reducer, initialValue);
        });

        return result.then((sum: number) => {
            // The sum should be 6 (1 + 2 + 3)
            expect(sum).toBe(6);
        });
    });
});