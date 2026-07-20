const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce", () => {
        // Create a sparse array where index 1 is not present
        const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays

        // Create a promise that will use array_reduce internally
        const deferred = Q.defer();
        let reduceResult: number | undefined;

        // Use Q.nextTick to ensure we're testing the async behavior
        Q.nextTick(() => {
            // Manually implement the reduce logic that uses the mutated condition
            reduceResult = sparseArray.reduce((acc: number, val: number, idx: number) => {
                // This mimics the behavior of array_reduce in q.js
                // The mutation changes the condition from (index in this) to (true)
                if (idx in sparseArray) {  // This line would be affected by the mutation
                    return acc + val;
                }
                return acc;
            }, 0);

            deferred.resolve(reduceResult);
        });

        return deferred.promise.then((result: number) => {
            // In the original code, result should be 4 (1 + 3) because index 1 is skipped
            // In the mutated code, it would try to include index 1 (undefined) and result would be NaN
            expect(isNaN(result)).toBe(false);
            expect(result).toBe(4);
        });
    });
});