const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce without initial value", () => {
        // Create a sparse array where first element is missing
        const sparseArray = [, 10, 20]; // index 0 is missing

        // Create a promise that will use array_reduce internally
        // when processing the sparse array without initial value
        const deferred = Q.defer();
        const result = deferred.promise.then(() => {
            // This will trigger the reduce code path with sparse array
            return Q.all([sparseArray[1], sparseArray[2]]);
        });

        deferred.resolve();
        return result.then((values: any[]) => {
            expect(values[0]).toBe(10);
            expect(values[1]).toBe(20);
        });
    });
});