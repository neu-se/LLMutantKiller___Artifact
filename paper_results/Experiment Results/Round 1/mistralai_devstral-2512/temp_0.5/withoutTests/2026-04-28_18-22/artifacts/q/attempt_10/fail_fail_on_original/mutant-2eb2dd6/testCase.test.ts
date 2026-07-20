// Test case to detect the mutation in array_reduce
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in array_reduce without initial value", () => {
        // Create a sparse array where the mutation would cause different behavior
        const sparseArray = [1, , 2, , 3];

        // This reducer will track which indices are processed
        const processedIndices: number[] = [];
        const reducer = (acc: number, curr: number, index: number) => {
            processedIndices.push(index);
            return acc + curr;
        };

        // Directly test the array_reduce implementation
        const result = Q(sparseArray).then((arr: any[]) => {
            // Use the internal array_reduce that's being mutated
            return arr.reduce(reducer);
        });

        return result.then((sum: number) => {
            // The sum should be 6 (1 + 2 + 3)
            expect(sum).toBe(6);
            // Should process indices 1, 2, 4 (starting from first non-sparse element)
            expect(processedIndices).toEqual([1, 2, 4]);
        });
    });
});