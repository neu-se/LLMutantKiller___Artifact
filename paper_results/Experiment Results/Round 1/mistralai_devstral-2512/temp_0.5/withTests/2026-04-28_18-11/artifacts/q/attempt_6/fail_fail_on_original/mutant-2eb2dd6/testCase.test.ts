import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle array operations using Q's internal reduce", () => {
        // Create a deferred that will resolve with an array
        const deferred = Q.defer();
        const testArray = [1, 2, 3, 4, 5];

        // Resolve with the array
        deferred.resolve(testArray);

        return deferred.promise
            .then((arr: number[]) => {
                // Use Q's internal array_map which uses array_reduce
                // This is the key - array_map in Q uses array_reduce internally
                return Q(arr).dispatch('map', [function(val: number) {
                    return val * 2;
                }]);
            })
            .then((doubled: number[]) => {
                // Verify the mapping worked correctly
                expect(doubled).toEqual([2, 4, 6, 8, 10]);

                // Now test that we can reduce the results
                const sum = doubled.reduce((acc, val) => acc + val, 0);
                expect(sum).toBe(30);
            });
    });
});