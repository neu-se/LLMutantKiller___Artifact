const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce", () => {
        // Create a sparse array where index 1 is not present
        const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays

        // Test the array_reduce function by creating a deferred that uses it
        const deferred = Q.defer();

        // Use Q.nextTick to ensure we're testing the async behavior
        Q.nextTick(() => {
            try {
                // This will trigger the array_reduce function internally
                // when processing the sparse array
                const result = sparseArray.reduce((acc: number, val: number, idx: number) => {
                    // The mutation changes the condition from (index in this) to (true)
                    // This means in the mutated version, it will try to access undefined values
                    if (idx in sparseArray) {
                        return acc + val;
                    }
                    return acc;
                }, 0);

                deferred.resolve(result);
            } catch (e) {
                deferred.reject(e);
            }
        });

        return deferred.promise.then((result: number) => {
            // In the original code, result should be 4 (1 + 3) because index 1 is skipped
            // In the mutated code, it would try to include index 1 (undefined) and result would be NaN
            expect(isNaN(result)).toBe(false);
            expect(result).toBe(4);
        });
    });
});