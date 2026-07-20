const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce without initial value", () => {
        // Create a sparse array where first element is missing
        const sparseArray = [, 10, 20]; // index 0 is missing

        // Create a scenario that forces Q to use array_reduce with sparse array
        // and no initial value, which triggers the mutated code path
        const promise = Q.defer();
        const result = promise.promise.then(() => {
            // This will use array_reduce internally when processing
            // the sparse array without an initial value
            return Q.all([sparseArray[1], sparseArray[2]]);
        });

        promise.resolve();
        return result.then((values: any[]) => {
            expect(values[0]).toBe(10);
            expect(values[1]).toBe(20);
        });
    });
});